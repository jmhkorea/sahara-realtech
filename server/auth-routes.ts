import { Express, Request, Response } from 'express';
import { and, eq, sql } from 'drizzle-orm';
import { db } from './db';
import { 
  users, 
  systemAccess, 
  accessLogs, 
  insertUserSchema,
  insertSystemAccessSchema,
  insertAccessLogSchema 
} from '../shared/schema';
import { hashPassword, verifyPassword, extractRequestInfo } from './auth-utils';
import { log } from './vite';

export function setupAuthRoutes(app: Express) {
  /**
   * 사용자 등록 API
   * 관리자 권한을 가진 사용자만 새로운 사용자를 등록할 수 있음
   */
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      // 관리자 권한 확인
      if (req.session.userRole !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: '관리자 권한이 필요합니다.'
        });
      }

      // 유효성 검사
      const validatedData = insertUserSchema.parse(req.body);
      
      // 사용자명 중복 확인
      const existingUser = await db.select()
        .from(users)
        .where(eq(users.username, validatedData.username))
        .limit(1);
      
      if (existingUser.length > 0) {
        return res.status(400).json({ 
          success: false, 
          error: '이미 존재하는 사용자명입니다.'
        });
      }

      // 비밀번호 해싱
      const hashedPassword = await hashPassword(validatedData.password);

      // 사용자 생성
      const [newUser] = await db.insert(users)
        .values({
          ...validatedData,
          password: hashedPassword,
          lastLogin: new Date()
        })
        .returning({
          id: users.id,
          username: users.username,
          email: users.email,
          role: users.role
        });

      res.status(201).json({
        success: true,
        user: newUser
      });
    } catch (error) {
      log(`사용자 등록 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '사용자 등록 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 로그인 API
   * 사용자 인증 및 로그인 처리
   */
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          error: '사용자명과 비밀번호를 모두 입력해주세요.'
        });
      }

      // 사용자 조회
      const [user] = await db.select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (!user) {
        // 로그인 실패 시 접근 로그 기록
        await db.insert(accessLogs).values({
          userId: null,
          systemId: 'main',
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
          requestPath: '/api/auth/login',
          status: 'denied',
          reason: '사용자를 찾을 수 없음'
        });

        return res.status(401).json({ 
          success: false, 
          error: '사용자명 또는 비밀번호가 올바르지 않습니다.'
        });
      }

      // 비밀번호 검증
      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        // 비밀번호 오류 로그 기록
        await db.insert(accessLogs).values({
          userId: user.id,
          systemId: 'main',
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
          requestPath: '/api/auth/login',
          status: 'denied',
          reason: '비밀번호 불일치'
        });

        return res.status(401).json({ 
          success: false, 
          error: '사용자명 또는 비밀번호가 올바르지 않습니다.'
        });
      }

      // 세션에 사용자 정보 저장
      req.session.userId = user.id;
      req.session.userRole = user.role || 'user';

      // 마지막 로그인 시간 업데이트
      await db.update(users)
        .set({ lastLogin: new Date() })
        .where(eq(users.id, user.id));

      // 로그인 성공 로그 기록
      await db.insert(accessLogs).values({
        userId: user.id,
        systemId: 'main',
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        requestPath: '/api/auth/login',
        status: 'success',
        reason: '로그인 성공'
      });

      // 사용자 정보 반환 (비밀번호 제외)
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      log(`로그인 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '로그인 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 로그아웃 API
   */
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    // 세션 파기
    req.session.destroy((err) => {
      if (err) {
        log(`로그아웃 오류: ${err}`);
        return res.status(500).json({ 
          success: false, 
          error: '로그아웃 중 오류가 발생했습니다.'
        });
      }
      
      res.status(200).json({ success: true, message: '로그아웃 되었습니다.' });
    });
  });

  /**
   * 현재 인증된 사용자 정보 조회 API
   */
  app.get('/api/auth/me', async (req: Request, res: Response) => {
    try {
      // 세션에서 사용자 ID 확인
      const userId = req.session.userId;
      
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          error: '인증되지 않은 요청입니다.'
        });
      }

      // 사용자 정보 조회
      const [user] = await db.select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

      if (!user) {
        // 세션에는 있지만 DB에 사용자가 없는 경우 세션 파기
        req.session.destroy(() => {});
        
        return res.status(401).json({ 
          success: false, 
          error: '사용자 정보를 찾을 수 없습니다.'
        });
      }

      res.status(200).json(user);
    } catch (error) {
      log(`사용자 정보 조회 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '사용자 정보 조회 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 시스템 접근 권한 확인 API
   */
  app.get('/api/auth/system-access/:systemId', async (req: Request, res: Response) => {
    try {
      const { systemId } = req.params;
      const userId = req.session.userId;
      const userRole = req.session.userRole;

      // 인증되지 않은 요청 거부
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          error: '인증되지 않은 요청입니다.',
          canAccess: false
        });
      }

      // 관리자는 모든 시스템에 접근 가능
      if (userRole === 'admin') {
        // 접근 로그 기록
        await db.insert(accessLogs).values({
          userId,
          systemId,
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
          requestPath: req.path,
          status: 'success',
          reason: '관리자 권한으로 접근'
        });

        return res.status(200).json({ 
          success: true, 
          canAccess: true,
          accessLevel: 'admin'
        });
      }

      // 사용자의 시스템 접근 권한 확인
      const [access] = await db.select()
        .from(systemAccess)
        .where(
          and(
            eq(systemAccess.userId, userId),
            eq(systemAccess.systemId, systemId),
            eq(systemAccess.canAccess, true)
          )
        )
        .limit(1);

      if (!access) {
        // 접근 거부 로그 기록
        await db.insert(accessLogs).values({
          userId,
          systemId,
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
          requestPath: req.path,
          status: 'denied',
          reason: '접근 권한 없음'
        });

        return res.status(403).json({ 
          success: false, 
          error: '해당 시스템에 대한 접근 권한이 없습니다.',
          canAccess: false
        });
      }

      // 만료된 접근 권한 확인
      if (access.expiresAt && new Date(access.expiresAt) < new Date()) {
        // 만료된 접근 로그 기록
        await db.insert(accessLogs).values({
          userId,
          systemId,
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
          requestPath: req.path,
          status: 'denied',
          reason: '접근 권한 만료됨'
        });

        return res.status(403).json({ 
          success: false, 
          error: '접근 권한이 만료되었습니다.',
          canAccess: false
        });
      }

      // 접근 횟수 및 마지막 접근 시간 업데이트
      await db.update(systemAccess)
        .set({ 
          lastAccessed: new Date(),
          accessCount: access.accessCount !== null ? access.accessCount + 1 : 1
        })
        .where(eq(systemAccess.id, access.id));

      // 접근 성공 로그 기록
      await db.insert(accessLogs).values({
        userId,
        systemId,
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        requestPath: req.path,
        status: 'success',
        reason: '정상 접근'
      });

      res.status(200).json({ 
        success: true, 
        canAccess: true,
        accessLevel: access.accessLevel
      });
    } catch (error) {
      log(`시스템 접근 권한 확인 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '시스템 접근 권한 확인 중 오류가 발생했습니다.',
        canAccess: false
      });
    }
  });

  /**
   * 시스템 접근 권한 부여 API (관리자 전용)
   */
  app.post('/api/auth/grant-access', async (req: Request, res: Response) => {
    try {
      // 관리자 권한 확인
      if (req.session.userRole !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: '관리자 권한이 필요합니다.'
        });
      }

      const validatedData = insertSystemAccessSchema.parse(req.body);
      
      // 이미 존재하는 접근 권한 확인
      const existingAccess = await db.select()
        .from(systemAccess)
        .where(
          and(
            eq(systemAccess.userId, Number(validatedData.userId)),
            eq(systemAccess.systemId, validatedData.systemId)
          )
        )
        .limit(1);

      if (existingAccess.length > 0) {
        // 기존 접근 권한 업데이트
        await db.update(systemAccess)
          .set({
            canAccess: validatedData.canAccess,
            accessLevel: validatedData.accessLevel,
            expiresAt: validatedData.expiresAt,
            grantedBy: req.session.userId,
            grantedAt: new Date()
          })
          .where(eq(systemAccess.id, existingAccess[0].id));

        return res.status(200).json({ 
          success: true, 
          message: '시스템 접근 권한이 업데이트되었습니다.',
          access: existingAccess[0].id
        });
      }

      // 새 접근 권한 생성
      const [newAccess] = await db.insert(systemAccess)
        .values({
          ...validatedData,
          grantedBy: req.session.userId,
          grantedAt: new Date()
        })
        .returning({ id: systemAccess.id });

      res.status(201).json({ 
        success: true, 
        message: '시스템 접근 권한이 부여되었습니다.',
        access: newAccess.id
      });
    } catch (error) {
      log(`접근 권한 부여 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '접근 권한 부여 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 시스템 접근 권한 취소 API (관리자 전용)
   */
  app.post('/api/auth/revoke-access', async (req: Request, res: Response) => {
    try {
      // 관리자 권한 확인
      if (req.session.userRole !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: '관리자 권한이 필요합니다.'
        });
      }

      const { userId, systemId } = req.body;

      if (!userId || !systemId) {
        return res.status(400).json({ 
          success: false, 
          error: '사용자 ID와 시스템 ID가 필요합니다.'
        });
      }

      // 접근 권한 확인
      const existingAccess = await db.select()
        .from(systemAccess)
        .where(
          and(
            eq(systemAccess.userId, Number(userId)),
            eq(systemAccess.systemId, systemId as string)
          )
        )
        .limit(1);

      if (existingAccess.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: '해당 접근 권한을 찾을 수 없습니다.'
        });
      }

      // 접근 권한 비활성화
      await db.update(systemAccess)
        .set({ 
          canAccess: false,
          expiresAt: new Date() // 즉시 만료 처리
        })
        .where(eq(systemAccess.id, existingAccess[0].id));

      res.status(200).json({ 
        success: true, 
        message: '시스템 접근 권한이 취소되었습니다.'
      });
    } catch (error) {
      log(`접근 권한 취소 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '접근 권한 취소 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 접근 로그 조회 API (관리자 전용)
   */
  app.get('/api/auth/access-logs', async (req: Request, res: Response) => {
    try {
      // 관리자 권한 확인
      if (req.session.userRole !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: '관리자 권한이 필요합니다.'
        });
      }

      const { limit = 100, systemId, userId, status } = req.query;
      
      let query;
      
      if (systemId && userId && status) {
        query = db.select()
          .from(accessLogs)
          .where(and(
            eq(accessLogs.systemId, systemId as string),
            eq(accessLogs.userId, Number(userId)),
            eq(accessLogs.status, status as string)
          ))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (systemId && userId) {
        query = db.select()
          .from(accessLogs)
          .where(and(
            eq(accessLogs.systemId, systemId as string),
            eq(accessLogs.userId, Number(userId))
          ))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (systemId && status) {
        query = db.select()
          .from(accessLogs)
          .where(and(
            eq(accessLogs.systemId, systemId as string),
            eq(accessLogs.status, status as string)
          ))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (userId && status) {
        query = db.select()
          .from(accessLogs)
          .where(and(
            eq(accessLogs.userId, Number(userId)),
            eq(accessLogs.status, status as string)
          ))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (systemId) {
        query = db.select()
          .from(accessLogs)
          .where(eq(accessLogs.systemId, systemId as string))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (userId) {
        query = db.select()
          .from(accessLogs)
          .where(eq(accessLogs.userId, Number(userId)))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else if (status) {
        query = db.select()
          .from(accessLogs)
          .where(eq(accessLogs.status, status as string))
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      } else {
        query = db.select()
          .from(accessLogs)
          .orderBy(sql`${accessLogs.accessedAt} DESC`)
          .limit(Number(limit));
      }

      const logs = await query;

      res.status(200).json({ 
        success: true, 
        logs
      });
    } catch (error) {
      log(`접근 로그 조회 오류: ${error}`);
      res.status(500).json({ 
        success: false, 
        error: '접근 로그 조회 중 오류가 발생했습니다.'
      });
    }
  });

  /**
   * 초기 관리자 계정 생성 (개발 및 테스트용)
   * 실제 운영 환경에서는 비활성화해야 함
   */
  app.post('/api/auth/init-admin', async (req: Request, res: Response) => {
    try {
      // 기존 관리자 계정 확인
      const existingAdmin = await db.select()
        .from(users)
        .where(eq(users.role, 'admin'))
        .limit(1);

      if (existingAdmin.length > 0) {
        return res.status(400).json({ 
          message: '관리자 계정이 이미 존재합니다.'
        });
      }

      // 관리자 계정 생성
      const adminPassword = await hashPassword('admin1234'); // 기본 비밀번호 (실제 운영 환경에서는 더 강력한 비밀번호 사용)
      
      const [admin] = await db.insert(users)
        .values({
          username: 'admin',
          email: 'admin@sahararealtech.com',
          password: adminPassword,
          role: 'admin',
          lastLogin: new Date()
        })
        .returning({
          id: users.id,
          username: users.username,
          email: users.email,
          role: users.role
        });

      res.status(201).json(admin);
    } catch (error) {
      log(`관리자 계정 초기화 오류: ${error}`);
      res.status(500).json({ 
        error: '관리자 계정 생성 중 오류가 발생했습니다.'
      });
    }
  });
}