import { log } from "./vite";

/**
 * 서버 시작 시 초기 관리자 계정 생성을 시도하는 함수
 */
export async function initializeAuth() {
  try {
    // 초기 관리자 계정 생성 API 호출
    const response = await fetch('http://localhost:5000/api/auth/init-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      log(`관리자 계정이 성공적으로 생성되었습니다. 사용자명: ${data.username}`);
    } else if (response.status === 400) {
      // 이미 관리자 계정이 존재하는 경우 (정상적인 상태)
      log('관리자 계정이 이미 존재합니다.');
    } else {
      log(`관리자 계정 초기화 중 오류 발생: ${response.status}`);
    }
  } catch (error) {
    log(`관리자 계정 초기화 시도 실패: ${error}`);
  }
}