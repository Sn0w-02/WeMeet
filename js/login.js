document.addEventListener('DOMContentLoaded', function () {
    const loginIdInput = document.getElementById('loginId');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginBtn');

    // 공통 로그인 실행 함수
    function handleLogin() {
        const loginId = loginIdInput.value.trim();
        const password = passwordInput.value.trim();

        fetch('https://sn0w-02.github.io/WeMeet/js/user.json')
            .then(response => response.json())
            .then(data => {
                // 아이디와 비밀번호가 일치하는 회원 찾기
                const user = data.find(function (user) {
                    return user.loginId === loginId && user.password === password;
                });

                if (user) {
                    //로그인 정보 로컬스토리지에 저장
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('loginId', user.loginId);
                    //관심동물 리스트 추가
                    localStorage.setItem('favoriteAnimalIds', JSON.stringify(user.favoriteAnimalIds))

                    alert('환영합니다!');
                    window.location.href = '../index.html';
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            })
            .catch(error => {
                console.log('user.json 불러오기 실패', error);
                alert('로그인 시스템에 문제가 발생했습니다.');
            });
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