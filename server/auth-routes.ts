import { Express, Request, Response } from 'express';
import { db } from './db';
import { users, accessLogs, systemAccess } from '@shared/schema';
import { hashPassword, verifyPassword, extractRequestInfo } from './auth-utils';
import { eq, and } from 'drizzle-orm';

export function setupAuthRoutes(app: Express) {
  /**
   * 사용자 등록 API
   * 관리자 권한을 가진 사용자만 새로운 사용자를 등록할 수 있음
   */
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { username, password, email, role } = req.body;
      
      // 이미 존재하는 사용자 확인
      const existingUser = await db.select().from(users).where(eq(users.username, username));
      
      if (existingUser.length > 0) {
        return res.status(400).json({ error: '이미 존재하는 사용자 이름입니다.' });
      }
      
      // 비밀번호 해시화
      const hashedPassword = await hashPassword(password);
      
      // 새 사용자 등록
      const [newUser] = await db.insert(users).values({
        username,
        password: hashedPassword,
        email,
        role: role || 'user',
      }).returning();
      
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      });
    } catch (error) {
      console.error('사용자 등록 오류:', error);
      res.status(500).json({ error: '사용자 등록 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 로그인 API
   * 사용자 인증 및 로그인 처리
   */
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // 사용자 조회
      const [user] = await db.select().from(users).where(eq(users.username, username));
      
      if (!user) {
        return res.status(401).json({ error: '사용자 정보를 찾을 수 없습니다.' });
      }
      
      // 비밀번호 검증
      const isValidPassword = await verifyPassword(password, user.password);
      
      if (!isValidPassword) {
        // 로그인 실패 기록
        await db.insert(accessLogs).values({
          userId: user.id,
          systemId: 'auth',
          status: 'denied',
          reason: '비밀번호 불일치',
          ...extractRequestInfo(req)
        });
        
        return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
      }
      
      // 로그인 성공 기록
      await db.insert(accessLogs).values({
        userId: user.id,
        systemId: 'auth',
        status: 'success',
        ...extractRequestInfo(req)
      });
      
      // 마지막 로그인 시간 업데이트
      await db.update(users)
        .set({ lastLogin: new Date() })
        .where(eq(users.id, user.id));
      
      // 세션에 사용자 정보 저장 (인증 상태 유지)
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      // 사용자 정보 반환 (민감한 정보 제외)
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('로그인 오류:', error);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 로그아웃 API
   */
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('로그아웃 오류:', err);
        return res.status(500).json({ error: '로그아웃 중 오류가 발생했습니다.' });
      }
      
      res.status(200).json({ message: '로그아웃 되었습니다.' });
    });
  });
  
  /**
   * 현재 인증된 사용자 정보 조회 API
   */
  app.get('/api/auth/me', async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: '인증되지 않은 사용자입니다.' });
      }
      
      const [user] = await db.select().from(users).where(eq(users.id, req.session.userId));
      
      if (!user) {
        return res.status(404).json({ error: '사용자 정보를 찾을 수 없습니다.' });
      }
      
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      res.status(500).json({ error: '사용자 정보 조회 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 시스템 접근 권한 확인 API
   */
  app.get('/api/auth/system-access/:systemId', async (req: Request, res: Response) => {
    try {
      const { systemId } = req.params;
      
      if (!req.session.userId) {
        return res.status(401).json({ error: '인증되지 않은 사용자입니다.' });
      }
      
      const [user] = await db.select().from(users).where(eq(users.id, req.session.userId));
      
      if (!user) {
        return res.status(404).json({ error: '사용자 정보를 찾을 수 없습니다.' });
      }
      
      // 관리자는 항상 접근 가능
      if (user.role === 'admin') {
        return res.status(200).json({ canAccess: true, accessLevel: 'admin' });
      }
      
      // 사용자의 시스템 접근 권한 확인
      const [access] = await db.select().from(systemAccess).where(
        and(
          eq(systemAccess.userId, user.id),
          eq(systemAccess.systemId, systemId),
          eq(systemAccess.canAccess, true)
        )
      );
      
      if (!access) {
        // 접근 실패 로그 기록
        await db.insert(accessLogs).values({
          userId: user.id,
          systemId: systemId,
          status: 'denied',
          reason: '접근 권한 없음',
          ...extractRequestInfo(req)
        });
        
        return res.status(403).json({ error: '해당 시스템에 대한 접근 권한이 없습니다.' });
      }
      
      // 만료 일자 확인
      if (access.expiresAt && new Date(access.expiresAt) < new Date()) {
        // 접근 실패 로그 기록
        await db.insert(accessLogs).values({
          userId: user.id,
          systemId: systemId,
          status: 'denied',
          reason: '접근 권한 만료',
          ...extractRequestInfo(req)
        });
        
        return res.status(403).json({ error: '시스템 접근 권한이 만료되었습니다.' });
      }
      
      // 접근 횟수 및 마지막 접근 시간 업데이트
      await db.update(systemAccess)
        .set({ 
          lastAccessed: new Date(),
          accessCount: access.accessCount + 1
        })
        .where(eq(systemAccess.id, access.id));
      
      // 접근 성공 로그 기록
      await db.insert(accessLogs).values({
        userId: user.id,
        systemId: systemId,
        status: 'success',
        ...extractRequestInfo(req)
      });
      
      res.status(200).json({ 
        canAccess: true, 
        accessLevel: access.accessLevel,
        expiresAt: access.expiresAt
      });
    } catch (error) {
      console.error('시스템 접근 권한 확인 오류:', error);
      res.status(500).json({ error: '시스템 접근 권한 확인 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 시스템 접근 권한 부여 API (관리자 전용)
   */
  app.post('/api/auth/grant-access', async (req: Request, res: Response) => {
    try {
      const { userId, systemId, accessLevel, expiresAt } = req.body;
      
      // 관리자 권한 확인
      if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.status(403).json({ error: '관리자만 접근 권한을 부여할 수 있습니다.' });
      }
      
      // 대상 사용자 확인
      const [targetUser] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!targetUser) {
        return res.status(404).json({ error: '대상 사용자를 찾을 수 없습니다.' });
      }
      
      // 기존 접근 권한 확인
      const existingAccess = await db.select().from(systemAccess).where(
        and(
          eq(systemAccess.userId, userId),
          eq(systemAccess.systemId, systemId)
        )
      );
      
      // 기존 접근 권한이 있는 경우 업데이트
      if (existingAccess.length > 0) {
        const [updated] = await db.update(systemAccess)
          .set({
            canAccess: true,
            accessLevel,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            grantedBy: req.session.userId,
            grantedAt: new Date()
          })
          .where(
            and(
              eq(systemAccess.userId, userId),
              eq(systemAccess.systemId, systemId)
            )
          )
          .returning();
        
        return res.status(200).json(updated);
      }
      
      // 새로운 접근 권한 생성
      const [newAccess] = await db.insert(systemAccess)
        .values({
          userId,
          systemId,
          canAccess: true,
          accessLevel,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          grantedBy: req.session.userId
        })
        .returning();
      
      res.status(201).json(newAccess);
    } catch (error) {
      console.error('접근 권한 부여 오류:', error);
      res.status(500).json({ error: '접근 권한 부여 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 시스템 접근 권한 취소 API (관리자 전용)
   */
  app.post('/api/auth/revoke-access', async (req: Request, res: Response) => {
    try {
      const { userId, systemId } = req.body;
      
      // 관리자 권한 확인
      if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.status(403).json({ error: '관리자만 접근 권한을 취소할 수 있습니다.' });
      }
      
      // 접근 권한 업데이트
      const [updated] = await db.update(systemAccess)
        .set({
          canAccess: false
        })
        .where(
          and(
            eq(systemAccess.userId, userId),
            eq(systemAccess.systemId, systemId)
          )
        )
        .returning();
      
      if (!updated) {
        return res.status(404).json({ error: '대상 접근 권한을 찾을 수 없습니다.' });
      }
      
      res.status(200).json({ message: '접근 권한이 성공적으로 취소되었습니다.' });
    } catch (error) {
      console.error('접근 권한 취소 오류:', error);
      res.status(500).json({ error: '접근 권한 취소 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 접근 로그 조회 API (관리자 전용)
   */
  app.get('/api/auth/access-logs', async (req: Request, res: Response) => {
    try {
      // 관리자 권한 확인
      if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.status(403).json({ error: '관리자만 접근 로그를 조회할 수 있습니다.' });
      }
      
      const logs = await db.select().from(accessLogs).orderBy(accessLogs.accessedAt);
      
      res.status(200).json(logs);
    } catch (error) {
      console.error('접근 로그 조회 오류:', error);
      res.status(500).json({ error: '접근 로그 조회 중 오류가 발생했습니다.' });
    }
  });
  
  /**
   * 초기 관리자 계정 생성 (개발 및 테스트용)
   * 실제 운영 환경에서는 비활성화해야 함
   */
  app.post('/api/auth/init-admin', async (req: Request, res: Response) => {
    try {
      // 이미 관리자 계정이 있는지 확인
      const admins = await db.select().from(users).where(eq(users.role, 'admin'));
      
      if (admins.length > 0) {
        return res.status(400).json({ error: '관리자 계정이 이미 존재합니다.' });
      }
      
      // 비밀번호 해시화
      const hashedPassword = await hashPassword('admin123'); // 실제 사용 시 더 강력한 비밀번호로 변경
      
      // 관리자 계정 생성
      const [admin] = await db.insert(users).values({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@sahararealtech.com',
        role: 'admin',
        isVerified: true
      }).returning();
      
      res.status(201).json({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      });
    } catch (error) {
      console.error('관리자 계정 생성 오류:', error);
      res.status(500).json({ error: '관리자 계정 생성 중 오류가 발생했습니다.' });
    }
  });
}