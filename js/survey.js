
const finish = document.querySelector('.finish');
const recommendList = document.querySelector('.question');
const listBtn = document.querySelector('.list-btn');

//json 데이터 저장 변수
let animals = [];
//추천 결과 선택 변수
let matchedAnimals = [];
//보여주고 있는 카드 변수
let visibleCount = 3;
//더 보여줄 카드 변수
const showCount = 3;

//선택한 답변을 객체에 저장
let answers = {
    experienceLevel: '',
    type: '',
    size: '',
    personality: '',
    ageGroup: '',
    residence: '',
    household: '',
    awayTime: '',
    walkTime: ''
};

fetch('../js/animal.json').then(response => response.json())
    .then(data => {
        animals = data;
        //console.log('data', animals); //객체 확인함.
    })
/* .catch(error=>{
    console.error("JSON 불러오기 오류:",error) 없어도 된다고 생각함
}) */


function getAnswers() {
    const experienceLevel = document.querySelector('input[name="experiencelevel"]:checked');
    const type = document.querySelector('input[name="type"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const personality = document.querySelector('input[name="personality"]:checked');
    const ageGroup = document.querySelector('input[name="agegroup"]:checked');
    const residence = document.querySelector('input[name="residence"]:checked');
    const household = document.querySelector('input[name="household"]:checked');
    const awayTime = document.querySelector('input[name="awaytime"]:checked');
    const walkTime = document.querySelector('input[name="walktime"]:checked');

    //선택한 값 저장
    answers.experienceLevel = experienceLevel ? experienceLevel.value : '';
    answers.type = type ? type.value : '';
    answers.size = size ? size.value : '';
    answers.personality = personality ? personality.value : '';
    answers.ageGroup = ageGroup ? ageGroup.value : '';
    answers.residence = residence ? residence.value : '';
    answers.household = household ? household.value : '';
    answers.awayTime = awayTime ? awayTime.value : '';
    answers.walkTime = walkTime ? walkTime.value : '';

    console.log('answers', answers)
}

function checkAllAnswers() {
    //answers 안의 모든 값을 가져오기
    const answerValues = Object.values(answers);

    //빈 값이 있는지 확인
    const hasEmptyAnswer = answerValues.some(value => value === '');
    //빈 값이 있으면 false
    if (hasEmptyAnswer) {
        return false;
    } return true;
}

function matchTrait(answer,animal){
    //상관없다를 선택하면 모든 동물 통과
    if(answer ==='any'){return true;}
return animal.personality.includes(answer);}//json과 선택값을 확인

//추천동물 점수 계산
function getScore(animal){
    let score = 0;

    if(animal.experienceLevel.includes(answers.experienceLevel))
        {score ++;}

    if (answers.type==='any'|| animal.type === answers.type){score++;}

    if(answers.size==='any'|| animal.size ===answers.size){score++;}

    if(matchPersonality(answers.personality,animal)){score++;}

    if(answers.ageGroup==='any'|| animal.ageGroup===answers.ageGroup){score++;}

    if(answers.residence==='any'|| animal.residence.includes(answers.residence)){score++;}

    if(animal.household.includes(answers.household)){score++;}

    if (animal.awayTime===answers.awayTime){score++;}

    if(animal.walkTime==='any'|| animal.walkTime===answers.walkTime){score++;}
}

//추천 동물 
function makeRecommendation(){
    matchedAniamls = animals.map(animal=>{
        return {...animal, score: getScore(animal)};
    });

    //점수 높은 순서
    matchedAnimals.sort((a,b)=>{
        return b.score - a.score;
    });

    visibleCount=3;

    renderCards();

    const recommendSection = document.querySelector('.survey-recommend');
    if (recommendSection){recommendSection.scrollIntoView({behavior:'smooth'});
}
}

//추천 동물 카드
function renderCards(){
    recommendList.innerHTML='';

    //보여줄 동물 가져오기
    const visivleAnimals=matchedAnimals.slice(0,visibleCount);

    //카드 만들기
    visibleAnimals.forEach(animal=>{
        const card = document.createElement('a');

        card.className='recommend-card';

        card.href='animal-detail.html?id=${animal.id';
        //이미지가 없으면 기본 이미지
        const image = animal.image || '../img/suvey/default-animal.png';
        const gender=animal.gender==='female'?'여아':'남아';
        const age=getAgeText(animal.ageMonths);
        const tags=animal.tags?animal.tags.join(''):'';
        card.innerHTML=`
            <div class="recommend-image">
                <img src="${image}" alt="${animal.name}">
            </div>
            <div class-"recommend-info">
                <h3>${animal.name}</h3>
                <p class="recommend-basic">${gender} · ${animal.breed}</p>
                <p class="recommend-age">${age}</p>
                <p class="recommend-tags">${tags}</p>
            </div>
        `;

        //카드 추가
        recommendList.appendChild(card);
    });
    if(visiblecount >= matchedAnimals.length){
        listBtn.style.display='none'
    }else{listBtn.style.display='block';}
}

function getAgeText(ageMonths) {
    const years = Math.floor(ageMonths/12);
    const months=ageMonths % 12;
    if (years ===0){
        return `${months}개월`;
    }
    if (months===0){
        return `${years}살`;
    }
    return `${years}살 ${months}개월`;
}
    
finish.addEventListener('click', ()=> {
    //설문 답변 가져오기
    getAnswers();

    //모든 질문에 답했는지 확인
    if(checkAllAnswers()){
        alert('모든 질문에 체크해주세요');
        return;
    }
    
    //Json 데이터가 있는지 확인
    if (animals.length===0){
        alert('잠시 후 다시 시도해주세요');
        return;
    }
    //추천 동물 만들기
    makeRecommendation();
});


listBtn.addEventListener('click',()=> {
    visibleCount += showCount;
    renderCards();
})







