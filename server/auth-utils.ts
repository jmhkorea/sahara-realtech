import { randomBytes, scrypt as scryptCallback } from 'crypto';
import { promisify } from 'util';
import { User } from '../shared/schema';
import { SystemAccess } from '../shared/schema';

// scrypt를 Promise 기반 함수로 변환
const scrypt = promisify(scryptCallback);

/**
 * 비밀번호를 안전하게 해시화하는 함수
 * @param password 평문 비밀번호
 * @returns 해시된 비밀번호 (salt.hash 형태)
 */
export async function hashPassword(password: string): Promise<string> {
  // 임의의 솔트(salt) 생성 (16바이트)
  const salt = randomBytes(16).toString('hex');
  
  // scrypt로 비밀번호 해싱 (64바이트 해시 생성)
  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  
  // 솔트와 해시를 합쳐서 반환 (format: hash.salt)
  return `${derivedKey.toString('hex')}.${salt}`;
}

/**
 * 사용자 입력 비밀번호와 저장된 해시를 비교하는 함수
 * @param password 사용자 입력 비밀번호
 * @param storedHash 저장된 해시 (hash.salt 형태)
 * @returns 일치 여부
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // 저장된 해시에서 솔트와 해시 추출
  const [hash, salt] = storedHash.split('.');
  
  // 입력된 비밀번호를 동일한 솔트로 해싱
  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  
  // 해싱된 비밀번호와 저장된 해시 비교
  return hash === derivedKey.toString('hex');
}

/**
 * 시스템 접근 권한을 검증하는 함수
 * @param user 사용자 객체
 * @param systemAccesses 사용자의 시스템 접근 권한 목록
 * @param systemId 시스템 식별자
 * @returns 접근 가능 여부
 */
export function canAccessSystem(user: User, systemAccesses: SystemAccess[], systemId: string): boolean {
  // 관리자는 모든 시스템에 접근 가능
  if (user.role === 'admin') {
    return true;
  }
  
  // 일반 사용자는 부여된 접근 권한에 해당 시스템이 포함되어 있는지 확인
  return systemAccesses.some(access => 
    access.systemId === systemId && access.userId === user.id && access.active
  );
}

/**
 * 접근 로그 기록을 위한 요청 정보 추출 함수
 * @param req Express 요청 객체
 * @returns 로그 기록을 위한 정보
 */
export function extractRequestInfo(req: any) {
  return {
    ipAddress: req.ip || req.connection?.remoteAddress || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
    method: req.method,
    path: req.path,
    timestamp: new Date()
  };
}