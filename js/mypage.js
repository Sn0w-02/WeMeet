/* Img Upload */
const ddayPhotoBtn = document.getElementById("ddayPhotoBtn");
const ddayImageInput = document.getElementById("ddayImageInput");
const ddayProfileImg = document.getElementById("ddayProfileImg");

let userUploadedImage = false;


// 사진 변경 버튼
ddayPhotoBtn.addEventListener("click", function () {
    ddayImageInput.click();
});


// 이미지 선택
ddayImageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 선택해주세요.");
        this.value = "";
        return;
    }

    const imageURL = URL.createObjectURL(file);

    ddayProfileImg.src = imageURL;

    userUploadedImage = true;
});



/* summary */

const petName = document.querySelector(".pet-name");
const dDayText = document.querySelector(".d-day-text");


fetch("https://sn0w-02.github.io/WeMeet/js/user.json")
    .then(response => response.json())
    .then(users => {

        const user = users[0];

        petName.textContent = user.myPet.name;

        const today = new Date();
        const adoptedDate = new Date(user.myPet.adoptedDate);

        const diff = today - adoptedDate;

        const days = Math.floor(
            diff / (1000 * 60 * 60 * 24)
        );

        dDayText.textContent = `D+${days}`;

    })
    .catch(error => {
        console.log(error);
    });