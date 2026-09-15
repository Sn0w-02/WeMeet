let animals = [];

//주소창에서 id 가져오기
const urlParams = new URLSearchParams(location.search);
const animalId = Number(urlParams.get('id'));


/* ======= 프로필 ========== */
const animalImage = document.querySelector('#animal-profile .web-img'),
    mobileImage = document.querySelector('#animal-profile .mobile'),
    mainTitle = document.querySelector('.main-title'),
    name = document.querySelector('.desc.name'),
    breed = document.querySelector('.desc.breed'),
    gender = document.querySelector('.desc.gender'),
    age = document.querySelector('.desc.age'),
    weight = document.querySelector('.desc.weight'),
    neutered = document.querySelector('.desc.neutered'),
    vaccinated = document.querySelector('.desc.vaccinated'),
    foster = document.querySelector('.desc.fosterstatus');

/* ========== 특성 ============= */
const likeContent = document.querySelector('.like-content'),
    disliked = document.querySelector('.bad-content'),
    infoBreed = document.querySelector('#detail-info .animal-info h2'),
    infodesc = document.querySelectorAll('info-desc'),
    careTitle = document.querySelector('.animal-care h2'),
    careList = document.querySelectorAll('.care-list'),
    careDesc = document.querySelectorAll('.howto');