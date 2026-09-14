
const finish = document.querySelector('.finish');
const recommendList = document.querySelector('.recommend-list');
const listBtn = document.querySelector('.list-btn');

//json 데이터 저장 변수
let animals = [];
//추천 결과 선택 변수
let recommendedAnimals = [];
//화면에 보여줄 카드 변수
let showCount = 0;


fetch('../js/animal.json').then(response => response.json())
    .then(data => {
        animals = data;
        //console.log('data', animals); //객체 확인함.
    })
/* .catch(error=>{
    console.error("JSON 불러오기 오류:",error) 없어도 된다고 생각함
}) */

finish.addEventListener('click', () => {
    const answers = {
        experienceLevel: document.querySelector('input[name="experiencelevel"]:checked')?.value,
        type: document.querySelector('input[name="type"]:checked')?.value,
        size: document.querySelector('input[name="size"]:checked')?.value,
        personality: document.querySelector('input[name="personality"]:checked')?.value,
        ageGroup: document.querySelector('input[name="agegroup"]:checked')?.value,
        residence: document.querySelector('input[name="residence"]:checked')?.value,
        houseHold: document.querySelector('input[name="household"]:checked')?.value,
        awayTime: document.querySelector('input[name="awaytime"]:checked')?.value,
        walkTime: document.querySelector('input[name="walktime"]:checked')?.value
    };

    if (
        !answers.experienceLevel ||
        !answers.type ||
        !answers.size ||
        !answers.personality ||
        !answers.ageGroup ||
        !answers.residence ||
        !answers.houseHold ||
        !answers.awayTime ||
        !answers.walkTime
    ) {
        alert('모든 문항을 선택해 주세요.');
        return;
    }
    //console.log('선택한답', answers)

    //점수 계산
    recommendedAnimals = animals.map(animal => {
        let score = 0;
        if (
            animal.experienceLevel.includes(answers.experienceLevel)
        ) { score++; }
        if (answers.type === 'any' || answers.type === animal.type) { score++; }
        if (answers.size === 'any' || answers.size === animal.size) { score++; }
        if (answers.personality.includes(answers.personality)) { score++; }
        if (answers.ageGroup === 'any' || answers.ageGroup === animal.ageGroup) { score++; }
        if (answers.residence.includes(answers.residence)) { score++; }
        if (animal.household.includes(answers.houseHold)) { score++; }
        if (animal.awayTime === answers.awayTime) { score++; }
        if (answers.walkTime === 'any' || animal.walkTime === answers.walkTime) { score++; }

        //점수가 추가된 동물 반환
        return {
            id: animal.id,
            name: animal.name,
            breed: animal.breed,
            ageMonths: animal.ageMonths,
            gender: animal.gender,
            image: animal.image,
            tags: animal.tags,
            score: score
        };
    });
    recommendedAnimals.sort((a, b) => {
        return b.score - a.score;
    });

    showCount = 3;
    //화면에 출력
    renderAnimals();

    document.querySelector('.survey-recommend').scrollIntoView({ behavior: 'smooth' });
});

function renderAnimals() {
    recommendList.innerHTML = '';

    const animalsToShow = recommendedAnimals.slice(0, showCount);

    animalsToShow.forEach(animal => {
        const card = document.createElement('div');

        card.className = 'recommend-card';

        if (animal.image) {
            card.innerHTML = `
            <div class="recommend-box">
                <div class="recommend-img">
                    <img src="${animal.image}" alt="${animal.name}">
                </div>
                <div class="recommend-info">
                    <div>
                        <h3>${animal.name}</h3>
                        <p>${animal.breed} / ${animal.ageMonths} / ${animal.gender}</p>
                    </div>
                    <div class="recommend-tags">
                        ${animal.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            `;
        }
        else {
            card.innerHTML = `
            <div class="recommend-box">
                <div class="recommend-image no-image">이미지 준비중</div>
                <div class="recommend-info">
                    <div>
                        <h3>${animal.name}</h3>
                        <p>${animal.breed} / ${animal.ageMonths} / ${animal.gender}</p>
                    </div>
                    <div class="recommend-tags">
                        ${animal.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            `;
        }

        recommendList.appendChild(card);
    });
    if (showCount >= recommendedAnimals.length) {
        listBtn.style.display = 'block';
    }
}
listBtn.addEventListener('click', () => {
    showCount = showCount + 3;
    renderAnimals();
});









