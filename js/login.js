document.addEventListener('DOMContentLoaded', function () {
    const loginIdInput = document.getElementById('loginId');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginBtn');

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const loginId = loginIdInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            // user.json에서 회원 정보 가져오기
            const response = await fetch('../js/user.json');

            if (!response.ok) {
                throw new Error('계정 정보를 불러오지 못했습니다.');
            }

            const data = await response.json();

            // user.json은 배열이므로 첫 번째 회원 정보 사용
            const user = data[0];

            // 아이디와 비밀번호 확인
            if (loginId === user.loginId && password === user.password) {
                alert('환영합니다!');

                // 로그인 성공 → index.html 이동
                window.location.href = '../index.html';
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');

                passwordInput.value = '';
                passwordInput.focus();
            }

        } catch (error) {
            console.error('로그인 처리 중 에러 발생:', error);
            alert('로그인 시스템에 문제가 발생했습니다.');
        }
    });
});
