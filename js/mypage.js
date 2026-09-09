/* summary */
const petName = document.querySelector(".pet-name");
const petImage = document.querySelector(".summary-card.d-day .summary-img img");
const dDayText = document.querySelector(".d-day-text");

/* profile */
const nickname = document.querySelector(".user-nickname");
const message = document.querySelector(".user-message");
const profileImg = document.querySelector(".profile-img img");

/* history */
const completeCount = document.querySelector(".history-complete-count");
const progressCount = document.querySelector(".history-progress-count");
const point = document.querySelector(".history-point");

/* survey */
const experience = document.querySelector(".survey-experience");
const residence = document.querySelector(".survey-residence");
const type = document.querySelector(".survey-type");
const preference = document.querySelector(".survey-preference");
const surveyTags = document.querySelector(".survey-tags");

/* favorite */
const favoriteList = document.querySelector(".favorite-list");


fetch("../js/user.json")
    .then(response => response.json())
    .then(users => {
        const user = users[0];

        petName.textContent = user.myPet.name;
        petImage.src = user.myPet.image;

        const today = new Date();
        const adoptedDate = new Date(user.myPet.adoptedDate);

        const diff = today - adoptedDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

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