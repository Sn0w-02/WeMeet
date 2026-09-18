let animals = [];


// ========================================
// 1. 주소창에서 id 가져오기
// ========================================

const urlParams = new URLSearchParams(location.search);
const animalId = Number(urlParams.get('id'));


// ========================================
// 2. HTML에서 사용할 요소 가져오기
// ========================================

// 프로필 이미지
const animalImage =
    document.querySelector('#animal-profile .web-img');

const mobileImage =
    document.querySelector('#animal-profile .mobile');


// 소개 문구
const mainTitle =
    document.querySelector('.main-title');


// 기본 프로필 정보
const name =
    document.querySelector('.desc.name');

const breed =
    document.querySelector('.desc.breed');

const gender =
    document.querySelector('.desc.gender');

const age =
    document.querySelector('.desc.age');

const weight =
    document.querySelector('.desc.weight');

const neutered =
    document.querySelector('.desc.neutered');

const vaccinated =
    document.querySelector('.desc.vaccinated');

const fosterStatus =
    document.querySelector('.desc.fosterstatus');


// ========================================
// 3. 좋아요 / 싫어요 영역
// ========================================

const likeContent =
    document.querySelector('.like-content');

const badContent =
    document.querySelector('.bad-content');


// ========================================
// 4. 기본 정보
// ========================================

const infoBreed =
    document.querySelector('#detail-info .animal-info h2');

const infoDesc =
    document.querySelectorAll('.info-desc');


// ========================================
// 5. 돌봄 정보
// ========================================

// 돌봄 전체 박스
const animalCare =
    document.querySelector('.animal-care');

// 돌봄 제목
const careTitle =
    document.querySelector('.animal-care h2');

// 돌봄 항목
const careList =
    document.querySelectorAll('.care-list');

// 돌봄 설명
const careDescription =
    document.querySelectorAll('.howto');


// ========================================
// 6. JSON 불러오기
// ========================================

fetch('../js/animal.json')

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        animals = data;


        // URL의 id와 같은 동물 찾기
        const animal = animals.find(function(item) {

            return item.id === animalId;

        });


        // 해당 동물이 없으면 종료
        if (!animal) {

            alert('동물 정보를 찾을 수 없습니다.');

            return;

        }


        // 찾은 동물의 정보를 화면에 출력
        renderAnimal(animal);

    });


// ========================================
// 7. 동물 정보를 HTML에 넣는 함수
// ========================================

function renderAnimal(animal) {


    // ========================================
    // 7-1. 프로필 이미지
    // ========================================

    animalImage.src = animal.image;
    animalImage.alt = animal.name;

    mobileImage.src = animal.image;
    mobileImage.alt = animal.name;



    // ========================================
    // 7-2. 소개 문구
    // ========================================

    if (animal.detail) {

        mainTitle.textContent =
            `“${animal.detail.intro}”`;

    }



    // ========================================
    // 7-3. 기본 프로필 정보
    // ========================================

    name.textContent =
        animal.name;


    breed.textContent =
        animal.breed;


    // 성별
    if (animal.gender === '여') {

        gender.textContent = '여아';

    } else {

        gender.textContent = '남아';

    }


    // 나이
    age.textContent =
        animal.ageMonths;


    // 몸무게
    weight.textContent =
        animal.weight + 'kg';


    // 중성화
    if (animal.neutered) {

        neutered.textContent = '완료';

    } else {

        neutered.textContent = '미완료';

    }


    // 예방접종
    if (animal.vaccinated) {

        vaccinated.textContent = '완료';

    } else {

        vaccinated.textContent = '미완료';

    }


    // 임시보호 상태
    if (animal.fosterStatus === 'progress') {

        fosterStatus.textContent = '진행중';

    } else {

        fosterStatus.textContent = '없음';

    }



    // ========================================
    // 7-4. 좋아하는 것
    // ========================================

    if (animal.detail) {

        const likeItems =
            document.querySelectorAll('.like-content > div');


        animal.detail.likes.forEach(function(like, index) {

            if (likeItems[index]) {

                const icon =
                    likeItems[index].querySelector('img');

                const text =
                    likeItems[index].querySelector('p');


                // 아이콘
                icon.src = like.icon;


                // 내용
                text.textContent = like.text;

            }

        });



        // ========================================
        // 7-5. 싫어하는 것
        // ========================================

        const badItems =
            document.querySelectorAll('.bad-content > div');


        animal.detail.dislikes.forEach(function(dislike, index) {

            if (badItems[index]) {

                const icon =
                    badItems[index].querySelector('img');

                const text =
                    badItems[index].querySelector('p');


                // 아이콘
                icon.src = dislike.icon;


                // 내용
                text.textContent = dislike.text;

            }

        });



        // ========================================
        // 7-6. 품종 정보
        // ========================================

        infoBreed.textContent =
            animal.breed;


        infoDesc[0].textContent =
            animal.detail.breedInfo.personality;


        infoDesc[1].textContent =
            animal.detail.breedInfo.colors.join(', ');


        infoDesc[2].textContent =
            animal.detail.breedInfo.lifespan;


        infoDesc[3].textContent =
            animal.detail.breedInfo.adultWeight + '(성체)';


        infoDesc[4].textContent =
            animal.detail.breedInfo.height + ' (어깨높이)';


        infoDesc[5].textContent =
            animal.detail.breedInfo.breedOrigin;



        // ========================================
        // 7-7. 돌봄 정보 제목
        // ========================================

        careTitle.innerHTML =
            `"${animal.name}" <br>이렇게 돌봐주세요`;



        // ========================================
        // 7-8. 돌봄 정보
        // ========================================

        animal.detail.care.forEach(function(care, index) {

            if (careList[index]) {

                const careHeading =
                    careList[index].querySelector('h4');


                careHeading.textContent =
                    care.title;

            }


            if (careDescription[index]) {

                careDescription[index].textContent =
                    care.description;

            }

        });



        // ========================================
        // 7-9. 강아지 / 고양이 케어 배경
        // ========================================

        if (animal.type === 'dog') {

            animalCare.style.backgroundImage =
                "url('../img/animal-detail/animal-care-bg.png')";


        } else if (animal.type === 'cat') {

            animalCare.style.backgroundImage =
                "url('../img/animal-detail/animal-care-cat-bg.png')";

        }

    }

}