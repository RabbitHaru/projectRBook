const axios = require('axios');

async function testBackend() {
    console.log("--- 백엔드 API 테스트 시작 ---");

    // 1. 블로그 목록 조회 테스트
    try {
        const blogRes = await axios.get('http://localhost:8080/api/blogs');
        console.log("✅ 블로그 목록 조회 성공:", blogRes.status, `(데이터 개수: ${blogRes.data.length})`);
    } catch (err) {
        console.error("❌ 블로그 목록 조회 실패:", err.message);
    }

    // 2. 회원가입 API 생존 확인 (로그만 확인)
    try {
        const joinRes = await axios.get('http://localhost:8080/api/blogs'); // 단순 연결 확인용
        console.log("✅ 백엔드 서버 연결 상태: 정상");
    } catch (err) {
        console.error("❌ 백엔드 서버 연결 실패:", err.message);
    }

    console.log("--- 테스트 종료 ---");
}

testBackend();
