document.addEventListener('DOMContentLoaded', function () {
    const loginIdInput = document.getElementById('loginId');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginBtn');

    // 공통 로그인 실행 함수
    function handleLogin() {
        const loginId = loginIdInput.value.trim();
        const password = passwordInput.value.trim();

        let data = null;

        try {
            // 서버 환경일 경우 user.json 가져오기 시도
            // (만약 fetch를 완전히 안 쓰고 user.js만 쓰신다면 이 try-catch 부분은 수정하셨던 대로 두시면 됩니다)
        } catch (error) {
            console.log('fetch 실패, user.js 대안 데이터 사용');
        }

        if (!data && typeof users !== 'undefined') {
            data = users;
        }

        if (!data || data.length === 0) {
            alert('로그인 시스템에 문제가 발생했습니다.');
            return;
        }

        const user = data[0];

        // 아이디와 비밀번호 확인
        if (loginId === user.loginId && password === user.password) {
            alert('환영합니다!');
            window.location.href = '../index.html';
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    // 1. 로그인 버튼 클릭 시
    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        handleLogin();
    });

    // 2. 비밀번호 입력란이나 아이디 입력란에서 엔터키를 눌렀을 때
    const handleEnter = function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin();
        }
    };

    loginIdInput.addEventListener('keydown', handleEnter);
    passwordInput.addEventListener('keydown', handleEnter);
});