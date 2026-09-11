
const finish = document.querySelector('.finish');

// 완료 버튼을 클릭하면
finish.addEventListener('click', () => {

    const experienceLevel = document.querySelector('input[name="experiencelevel"]:checked');
    const type = document.querySelector('input[name="type"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const traits = document.querySelector('input[name="traits"]:checked');
    const ageGroup = document.querySelector('input[name="agegroup"]:checked');
    const residence = document.querySelector('input[name="residence"]:checked');
    const houseHold = document.querySelector('input[name="household"]:checked');
    const awayTime = document.querySelector('input[name="awaytime"]:checked');
    const walkTime = document.querySelector('input[name="walktime"]:checked');

    //console.log('experienceLevel', experienceLevel)

    //선택하지 않은 문장 확인
    if (!experienceLevel || !type || !size || !traits || !ageGroup || !residence || !houseHold || !awayTime || !walkTime) {
        //모달창으로 꾸밀 것
        alert("모든 답변에 체크해 주세요.");
        return;
    };

    //선택한 답변을 answers에 저장
    const answers = {
        experienceLevel: experienceLevel.value,
        type: type.value,
        size: size.value,
        traits: traits.value,
        ageGroup: ageGroup.value,
        residence: residence.value,
        household: houseHold.value,
        awayTime: awayTime.value,
        walkTime: walkTime.value
    };
    //console.log('answers', answers)


    fetch("../js/animal.json") //json파일 가져오기
        .then(response => response.json()) //javascript에서 쓸 수 있게 변환
        .then(animalData => { //animalData 변수에 저장
            //console.log('animalData', animalData);

            const result = animalData.filter(animal => {
                const experienceMatch = animal.experienceLevel === answers.experienceLevel;
                const typeMatch = animal.type === answers.type;
                const sizeMatch = animal.size === answers.size;
                const traitsMatch = animal.personality === answers.traits;
                const ageGroupMatch = animal.ageGroup === answers.ageGroup;
                const residenceMatch = animal.residence === answers.residence;
                const houseHold = animal.household === answers.houseHold;
                const awayTimeMatch = animal.awayTime === answers.awayTime;
                const walkTimeMatch = animal.walkTime === answers.walkTime;

                //6,9가지 조건이 모두 맞는 동물만 반환
                return (
                    experienceMatch &&
                    typeMatch &&
                    sizeMatch &&
                    traitsMatch &&
                    ageGroupMatch &&
                    residenceMatch &&
                    houseHold &&
                    awayTimeMatch &&
                    walkTimeMatch
                )
            })
            console.log(result)


            //recommend list
            const recommendList = document.querySelector('.recommend-list');
            recommendList.innerHTML = '';

            result.forEach(animal => {
                const card = document.createElement("div");
                card.classList.add('recommend-card');
                card.innerHTML = `
                <a herf="../pages/animal-detail.html" alt="">
                    <div class="recommend-img">
                        <img src=${animal.image} alt={animal.name}>
                    </div>
                    <div class="recommend-info">
                        <h4>이름: ${animal.name}</h4>
                        <p>${animal.breed}/${animal.ageMonths}/${animal.gender}</p>
                        <span>${animal.tags[0]}</span>
                        <span>${animal.tags[1]}</span>
                    </div>
                </a>
                `
                recommendList.appendChild('card');
            });
            if (result.length === 0) {

                recommendList.innerHTML = `

                    <p class="no-result">
                        조건에 맞는 동물이 없습니다.
                    </p>

                `;
            }

        });

});

