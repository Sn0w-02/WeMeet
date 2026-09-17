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



//benefit
var benefitSwiper = new Swiper('.benefit-swiper', {
    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    pagination: {
        el: '.swiper-pagination',
    },
});

//관심동물
const favoriteList = document.querySelector('.favorite-list')
let animalData

//동물 데이터 animal.json
fetch("https://sn0w-02.github.io/WeMeet/js/animal.json")
    .then((response) => response.json())
    .then((animals) => {
        animalData = animals
        //animal.json 정보 콘솔
        console.log('animalData:', animalData)
        showFavoriteAnimals()
    })
    .catch((error) => {
        console.log(error)
    })

//login.js favoriteAnimalIds 정보 추가 변경
function showFavoriteAnimals() {
    if (!animalData) {
        return
    }
    const favoriteAnimalIds = JSON.parse(
        localStorage.getItem('favoriteAnimalIds')) || []
    const favoriteAnimals = animalData.filter((animal) => {
        return favoriteAnimalIds.includes(animal.id)
    })
    console.log('favoriteAnimals:', favoriteAnimals)
    //animal.js 동물카드 부분 재사용
    favoriteList.innerHTML = favoriteAnimals
        .map((animal) => {
            const genderIcon =
                animal.gender === '여' ? '♀' : '♂'

            const genderClass =
                animal.gender === '여' ? 'female' : 'male'

            const tags = animal.tags
                .slice(0, 3)
                .map((tag) => {
                    return `<span>${tag}</span>`
                })
                .join('')

            return `
                <article class="animal-card">
                    <button
                        type="button"
                        class="favorite-btn active"
                        data-id="${animal.id}"
                        aria-label="${animal.name} 관심 등록"
                    >
                       <svg viewBox="0 0 24 24">
                            <path d="M12 21.35
                                    10.55 20.03
                                    C5.4 15.36 2 12.28 2 8.5
                                    C2 5.42 4.42 3 7.5 3
                                    C9.24 3 10.91 3.81 12 5.09
                                    C13.09 3.81 14.76 3 16.5 3
                                    C19.58 3 22 5.42 22 8.5
                                    C22 12.28 18.6 15.36 13.45 20.03
                                    L12 21.35Z">
                            </path>
                        </svg>
                    </button>

                    <a
                        href="animal-detail.html?id=${animal.id}"
                        class="animal-card-link"
                    >
                        <div class="animal-image">
                            <img
                                src="${animal.image}"
                                alt="${animal.name}"
                            >
                        </div>

                        <div class="animal-info">
                            <div class="animal-name-row">
                                <span class="gender-icon ${genderClass}">
                                    ${genderIcon}
                                </span>

                                <strong class="animal-name">
                                    ${animal.name}
                                </strong>
                            </div>

                            <p class="animal-summary">
                                ${animal.breed} /
                                ${animal.ageMonths} /
                                ${animal.weight}kg
                            </p>

                            <div class="animal-tags">
                                ${tags}
                            </div>
                        </div>
                    </a>
                </article>
            `
        })
        .join('')
}