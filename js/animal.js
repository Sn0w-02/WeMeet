let animals;

//관심동물 정보
let favoriteAnimalIds = JSON.parse(localStorage.getItem('favoriteAnimalIds')) || [];

fetch("https://sn0w-02.github.io/WeMeet/js/animal.json")
    .then((response) => response.json())
    .then((data) => {
        animals = data;
        showAnimals(animals);
    })
    .catch((error) => {
        console.log(error);
    });

const animalList = document.querySelector('.animal-list')
const animalCount = document.querySelector('.animal-count')
const resultCount = document.querySelector('.result-count')
const onResult = document.querySelector('.no-result')
const searchBtn = document.querySelector('.finish-btn')
const resetBtn = document.querySelector('.reset-btn')

const animalButtons = document.querySelectorAll('.animal')
const genderButtons = document.querySelectorAll('.gender')

let selectedAnimal = 'any'
let selectedGender = 'all'

//모바일 option 추가
const mobileAge = document.querySelector('#mobile-age')
const mobileSize = document.querySelector('#mobile-size')
const mobilePersonality = document.querySelector('#mobile-personality')


function setActiveButton(buttons, clickedButton) {
    buttons.forEach((button) => {
        button.classList.remove('active')
    });
    clickedButton.classList.add('active')
}
//동물버튼 클릭
animalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveButton(animalButtons, button);
        selectedAnimal = button.dataset.type;
        console.log({
            selectedAnimal,
            selectedGender
        })
    })
})
//성별 버튼 클릭
genderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveButton(genderButtons, button);

        selectedGender = button.dataset.type;

        console.log({
            selectedAnimal,
            selectedGender
        });
    });
});
//성향의 "상관없다를 선택하면 다른 성향 선택을 해제"
const personalityInputs = document.querySelectorAll('input[name="personality"]')
//상관없다 체크박스 선택
const anyInput = document.querySelector('input[name="personality"][value="any"]')

personalityInputs.forEach((input) => {
    input.addEventListener('change', () => {
        //상관없다를 체크한 경우
        if (input.value === 'any' && input.checked) {
            personalityInputs.forEach((item) => {
                //상관없다를 제외한 나머지 체크 해제
                if (item !== anyInput) {
                    item.checked = false;
                }
            });
            return;

        }
        //다른 성향을 체크한 경우
        if (input.value !== 'any' && input.checked) {
            anyInput.checked = false;
        }
    })
})
function getSelectedFilters() {
    const checkedAge = document.querySelector('input[name="age"]:checked');

    const checkedSize =
        document.querySelector('input[name="size"]:checked');

    const checkedPersonalities =
        document.querySelectorAll(
            'input[name="personality"]:checked'
        );

    const personalities = [...checkedPersonalities]
        .map((input) => {
            return input.value;
        })
        .filter((value) => {
            return value !== 'any';
        });

    let gender = 'all';

    if (selectedGender === 'male') {
        gender = '남';
    }

    if (selectedGender === 'female') {
        gender = '여';
    }

    return {
        type: selectedAnimal,
        gender: gender,
        age: checkedAge ? checkedAge.value : 'any',
        size: checkedSize ? checkedSize.value : 'any',
        personalities: personalities
    };
}

//모바일 필터
function getMobileFilters() {
    let gender = 'all';

    if (selectedGender === 'male') {
        gender = '남';
    }

    if (selectedGender === 'female') {
        gender = '여';
    }

    return {
        type: selectedAnimal,
        gender: gender,
        age: mobileAge.value,
        size: mobileSize.value,
        personality: mobilePersonality.value
    };
}


// 동물 데이터를 카드로 만들어 화면에 출력
function showAnimals(items) {
    // 동물 마릿수 출력
    animalCount.textContent = items.length;
    resultCount.textContent = items.length;

    // 검색 결과가 없을 때
    if (items.length === 0) {
        animalList.innerHTML = '';
        onResult.hidden = false;
        return;
    }

    // 검색 결과가 있으면 안내문 숨기기
    onResult.hidden = true;

    // 동물 데이터를 카드 HTML로 변경
    animalList.innerHTML = items
        .map((animal) => {
            const genderIcon =
                animal.gender === '여' ? '♀' : '♂';

            const genderClass =
                animal.gender === '여' ? 'female' : 'male';

            const tags = animal.tags
                .slice(0, 3)
                .map((tag) => {
                    return `<span>${tag}</span>`;
                })
                .join('');

            return `
                <article class="animal-card">
                    <button
                        type="button"
                        class="favorite-btn ${favoriteAnimalIds.includes(animal.id) ? 'active' : ''}"
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
            `;
        })
        .join('');
}


// 검색 버튼을 누르면 선택한 조건에 맞는 동물만 남긴다.
// 선택한 모든 조건으로 동물을 필터링하는 함수
function applyFilters() {
    let filters;

    if (window.innerWidth <= 768) {
        filters = getMobileFilters();
    } else {
        filters = getSelectedFilters();
    }

    const filteredAnimals = animals.filter((animal) => {
        const animalMatch =
            filters.type === 'any' ||
            animal.type === filters.type;

        const genderMatch =
            filters.gender === 'all' ||
            animal.gender === filters.gender;

        const ageMatch =
            filters.age === 'any' ||
            animal.ageGroup === filters.age;

        const sizeMatch =
            filters.size === 'any' ||
            animal.size === filters.size;

        let personalityMatch;

        if (window.innerWidth <= 768) {
            personalityMatch =
                filters.personality === 'any' ||
                animal.personality.includes(filters.personality);
        } else {
            personalityMatch =
                filters.personalities.length === 0 ||
                filters.personalities.every((personality) => {
                    return animal.personality.includes(personality);
                });
        }

        return (
            animalMatch &&
            genderMatch &&
            ageMatch &&
            sizeMatch &&
            personalityMatch
        );
    });

    showAnimals(filteredAnimals);
}

// 완료 버튼을 눌러도 필터 실행
searchBtn.addEventListener('click', applyFilters);


resetBtn.addEventListener('click', () => {
    //동물,성별 선택값 초기화
    selectedAnimal = 'any'
    selectedGender = 'all'

    //라디오와 체크박스 초기화
    document.querySelectorAll('.filter input')
        .forEach((input) => {
            input.checked = input.value === 'any';
        });
    animalButtons.forEach((button) => {
        button.classList.remove('active')
    });
    genderButtons.forEach((button) => {
        button.classList.remove('active')
    })

    document.querySelector('.animal[data-type="any"]')
        .classList.add('active');

    document.querySelector('.gender[data-type="all"]')
        .classList.add('active');

    showAnimals(animals);
});

//모바일초기화
document.querySelectorAll('.select-mobile select')
    .forEach((select) => {
        const anyOption = [...select.options].find((option) => {
            return option.value === 'any';
        });
        if (anyOption) {
            select.value = 'any';

        }
    });

//관심동물 버튼 클릭
animalList.addEventListener('click', (e) => {
    const favoriteBtn = e.target.closest('.favorite-btn');

    if (favoriteBtn) {
        const animalId = Number(favoriteBtn.dataset.id);

        if (favoriteAnimalIds.includes(animalId)) {
            favoriteAnimalIds = favoriteAnimalIds.filter((id) => {
                return id !== animalId;
            });

            favoriteBtn.classList.remove('active');
        } else {
            favoriteAnimalIds.push(animalId);

            favoriteBtn.classList.add('active');
        }

        localStorage.setItem(
            'favoriteAnimalIds',
            JSON.stringify(favoriteAnimalIds)
        );
    }
});