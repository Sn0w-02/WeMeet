
const finish = document.querySelector('.finish');

// 완료 버튼을 클릭하면
finish.addEventListener('click', () => {

    const experienceLevel = document.querySelector('input[name="experiencelevel"]:checked');
    const type = document.querySelector('input[name="type"]:checked');
    const size = document.querySelector('input[name="size"]:checked');
    const traits = document.querySelector('input[name="traits"]:checked');
    const ageGroup = document.querySelector('input[name="agegroup"]:checked');
    const residence = document.querySelector('input[name="residence"]:checked');
    const household = document.querySelector('input[name="household"]:checked');
    const awayTime = document.querySelector('input[name="awaytime"]:checked');
    const walkTime = document.querySelector('input[name="walktime"]:checked');

    if (!experienceLevel || !type || !size || !traits || !ageGroup || !residence || !household || !awayTime || !walkTime) {
        //모달창으로 꾸밀 것
        alert("모든 답변에 체크해 주세요.");
        return;
    };
    const answers = {
        experienceLevel: experienceLevel.value,
        type: type.value,
        size: size.value,
        traits: traits.value,
        ageGroup: ageGroup.value,
        residence: residence.value,
        household: household.value,
        awayTime: awayTime.value,
        walkTime: walkTime.value
    };
    console.log(answers)
})

fetch("../js/animal.json") //json파일 가져오기
    .then(response => response.json()) //javascript에서 쓸 수 있게 변환
    .then(animalData => { //animalData 변수에 저장
        //console.log(animalData);
        const result = animalData.filter(animal => {
            return animal.experiencelevel === experiencelevel.value;
        })
        console.log(result)
    })

