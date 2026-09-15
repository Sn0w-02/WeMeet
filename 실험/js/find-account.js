// 아이디 찾기
const findIdBtn = document.querySelector("#findIdBtn");

findIdBtn.addEventListener("click", function () {

    const name = document.querySelector("#findName").value.trim();
    const phone = document.querySelector("#findPhone").value.trim();

    const result = document.querySelector("#idResult");


    // 입력값 확인
    if (name === "" || phone === "") {

        result.textContent = "이름과 전화번호를 모두 입력해주세요.";
        result.className = "result error";

        return;
    }


    // users 배열에서 사용자 찾기
    const user = users.find(function (user) {

        return user.name === name &&
            user.phone === phone;

    });


    // 사용자가 있는 경우
    if (user) {

        result.textContent =
            `회원님의 아이디는 ${user.loginId} 입니다.`;

        result.className = "result success";

    } else {

        result.textContent =
            "일치하는 회원 정보를 찾을 수 없습니다.";

        result.className = "result error";
    }

});


// 비밀번호 찾기
const findPwBtn = document.querySelector("#findPwBtn");

findPwBtn.addEventListener("click", function () {

    const loginId =
        document.querySelector("#findLoginId").value.trim();

    const email =
        document.querySelector("#findEmail").value.trim();

    const result =
        document.querySelector("#pwResult");


    // 입력값 확인
    if (loginId === "" || email === "") {

        result.textContent =
            "아이디와 이메일을 모두 입력해주세요.";

        result.className = "result error";

        return;
    }


    // users 배열에서 사용자 찾기
    const user = users.find(function (user) {

        return user.loginId === loginId &&
            user.email === email;

    });


    // 사용자 확인
    if (user) {

        result.textContent =
            `회원님의 비밀번호는 ${user.password} 입니다.`;

        result.className = "result success";

    } else {

        result.textContent =
            "일치하는 회원 정보를 찾을 수 없습니다.";

        result.className = "result error";
    }

});