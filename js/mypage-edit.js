document.addEventListener("DOMContentLoaded", function () {
    /* ==========================================
       1. 프로필 이미지 업로드 기능 
       ================================---------- */
    const photoChangeBtn = document.querySelector(".photo-change-btn");
    const editProfileImageInput = document.querySelector("#editProfileImageInput");
    const profileImgElement = document.querySelector("#profile-edit .profile-img img");

    if (photoChangeBtn && editProfileImageInput) {
        photoChangeBtn.addEventListener("click", function () {
            editProfileImageInput.click();
        });

        editProfileImageInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            if (!file.type.startsWith("image/")) {
                alert("이미지 파일만 선택해주세요.");
                this.value = "";
                return;
            }

            const imageURL = URL.createObjectURL(file);
            if (profileImgElement) {
                profileImgElement.src = imageURL;
            }
        });
    }


    /* ==========================================
       2. 프로필 정보 (닉네임, 상태 메시지) 수정 및 저장
       ================================---------- */
    const editNicknameInput = document.getElementById("editNicknameInput");
    const editMessageInput = document.getElementById("editMessageInput");
    const profileEditBtn = document.querySelector("#profile-edit .profile-edit");

    // 저장된 프로필 데이터 불러오기
    const savedProfileData = localStorage.getItem("weMeet_profile");
    if (savedProfileData) {
        const profile = JSON.parse(savedProfileData);
        if (editNicknameInput && profile.nickname) editNicknameInput.value = profile.nickname;
        if (editMessageInput && profile.message) editMessageInput.value = profile.message;
    }

    // 프로필 수정 버튼 클릭 시
    if (profileEditBtn) {
        profileEditBtn.addEventListener("click", function () {
            const nicknameVal = editNicknameInput ? editNicknameInput.value.trim() : "";
            const messageVal = editMessageInput ? editMessageInput.value.trim() : "";

            if (!nicknameVal) {
                alert("닉네임을 입력해주세요.");
                editNicknameInput.focus();
                return;
            }

            const profileData = {
                nickname: nicknameVal,
                message: messageVal
            };

            localStorage.setItem("weMeet_profile", JSON.stringify(profileData));
            alert("프로필 정보가 수정되었습니다!");
        });
    }


    /* ==========================================
       3. 반려동물 정보 수정 및 저장 기능
       ================================---------- */
    const petNicknameSpan = document.querySelector(".pet-nickname-text");
    const dDaySpan = document.querySelector(".d-day-text");
    const petBreedSpan = document.querySelector(".pet-breed-text");
    const saveMypetBtn = document.getElementById("saveMypetBtn");

    // 저장된 반려동물 데이터 불러오기 및 input 변환 처리
    const savedPetData = localStorage.getItem("weMeet_pet");

    // 페이지 로드 시 기존 텍스트를 input으로 바꿔주어 수정할 수 있게 세팅
    if (petNicknameSpan && dDaySpan && petBreedSpan) {
        // 이미 저장된 값이 있다면 적용
        let currentPet = savedPetData ? JSON.parse(savedPetData) : {
            name: petNicknameSpan.textContent.trim(),
            date: dDaySpan.textContent.trim(),
            breed: petBreedSpan.textContent.trim()
        };

        // input 형태로 변경하여 사용자가 수정할 수 있도록 유도
        petNicknameSpan.innerHTML = `<input type="text" id="editPetName" value="${currentPet.name}">`;
        dDaySpan.innerHTML = `<input type="date" id="editPetDate" value="${currentPet.date}">`;
        petBreedSpan.innerHTML = `<input type="text" id="editPetBreed" value="${currentPet.breed}">`;
    }

    // 반려동물 정보 '수정하기' 버튼 클릭 시
    if (saveMypetBtn) {
        saveMypetBtn.addEventListener("click", function () {
            const editPetName = document.getElementById("editPetName");
            const editPetDate = document.getElementById("editPetDate");
            const editPetBreed = document.getElementById("editPetBreed");

            if (!editPetName.value.trim() || !editPetDate.value.trim() || !editPetBreed.value.trim()) {
                alert("반려동물 정보를 모두 입력해주세요.");
                return;
            }

            const petData = {
                name: editPetName.value.trim(),
                date: editPetDate.value.trim(),
                breed: editPetBreed.value.trim()
            };

            localStorage.setItem("weMeet_pet", JSON.stringify(petData));
            alert("반려동물 정보가 성공적으로 수정되었습니다!");
        });
    }


    /* ==========================================
       4. Benefit Swiper 슬라이드 설정 
       ================================---------- */
    const benefitSwiperEl = document.querySelector('.benefit-swiper');
    if (benefitSwiperEl) {
        new Swiper('.benefit-swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {

    const personalRows = document.querySelectorAll(".personal-basic > div");

    if (personalRows.length >= 2) {
        const passwordRow = personalRows[1];
        const passwordDd = passwordRow.querySelector("dd");
        const passwordChangeBtn = passwordRow.querySelector(".personal-change");

        let isEditingPassword = false;

        if (passwordChangeBtn && passwordDd) {
            passwordChangeBtn.addEventListener("click", function () {
                if (!isEditingPassword) {
                    passwordDd.innerHTML = `
                        <input type="password" id="editPasswordInput" placeholder="새 비밀번호 입력" style="width: 100%; height: 100%; border: none; outline: none; background: transparent; font-size: inherit; font-family: inherit;">
                    `;

                    const editPasswordInput = document.getElementById("editPasswordInput");
                    if (editPasswordInput) {
                        editPasswordInput.focus(); // 
                    }

                    passwordChangeBtn.textContent = "저장";
                    isEditingPassword = true;
                } else {
                    const editPasswordInput = document.getElementById("editPasswordInput");
                    const passwordVal = editPasswordInput ? editPasswordInput.value.trim() : "";

                    if (!passwordVal) {
                        alert("변경할 비밀번호를 입력해주세요.");
                        if (editPasswordInput) editPasswordInput.focus();
                        return;
                    }

                    // 브라우저 저장소(localStorage)에 비밀번호 저장
                    localStorage.setItem("weMeet_password", passwordVal);

                    // 화면을 다시 마스킹된 텍스트(********) 상태로 원복
                    passwordDd.textContent = "********";
                    passwordChangeBtn.textContent = "변경";
                    isEditingPassword = false;

                    // 수정 완료 안내 메시지 팝업
                    alert("비밀번호가 성공적으로 변경되었습니다!");
                }
            });
        }
    }
});