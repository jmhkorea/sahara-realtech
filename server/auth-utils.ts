import crypto from 'crypto';
import { User, SystemAccess } from '@shared/schema';

/**
 * 비밀번호를 안전하게 해시화하는 함수
 * @param password 평문 비밀번호
 * @returns 해시된 비밀번호 (salt.hash 형태)
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 랜덤 솔트 생성
    const salt = crypto.randomBytes(16).toString('hex');
    
    // 비밀번호 해시 생성 (PBKDF2 사용)
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}.${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * 사용자 입력 비밀번호와 저장된 해시를 비교하는 함수
 * @param password 사용자 입력 비밀번호
 * @param storedHash 저장된 해시 (salt.hash 형태)
 * @returns 일치 여부
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, hash] = storedHash.split('.');
    
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex') === hash);
    });
  });
}

/**
 * 시스템 접근 권한을 검증하는 함수
 * @param user 사용자 객체
 * @param systemId 시스템 식별자
 * @returns 접근 가능 여부
 */
export function canAccessSystem(user: User, systemAccesses: SystemAccess[], systemId: string): boolean {
  // 관리자는 항상 모든 시스템에 접근 가능
  if (user.role === 'admin') {
    return true;
  }
  
  // 사용자별 시스템 접근 권한 확인
  const access = systemAccesses.find(access => 
    access.userId === user.id && 
    access.systemId === systemId && 
    access.canAccess
  );
  
  // 접근 권한이 없거나 만료된 경우
  if (!access) {
    return false;
  }
  
  // 만료일 확인
  if (access.expiresAt && new Date(access.expiresAt) < new Date()) {
    return false;
  }
  
  return true;
}

/**
 * 접근 로그 기록을 위한 요청 정보 추출 함수
 * @param req Express 요청 객체
 * @returns 로그 기록을 위한 정보
 */
export function extractRequestInfo(req: any) {
  return {
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    requestPath: req.path
  };
}