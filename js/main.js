//main-visual
const mainVisualSwiper = new Swiper('.main-visual-swiper', {
    spaceBetween: 30,

    pagination: {
        el: '#main-visual .swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '#main-visual .swiper-button-next',
        prevEl: '#main-visual .swiper-button-prev',
    },

    on: {
        init: function () {
            playCurrentVideo(this);
        },

        slideChange: function () {
            playCurrentVideo(this);
        },
    },
});


function playCurrentVideo(swiperInstance) {

    const mainVisualVideos =
        document.querySelectorAll('#main-visual .main-video');

    // 모든 영상 정지
    mainVisualVideos.forEach((video) => {
        video.pause();
        video.currentTime = 0;
        video.onended = null;
    });

    // 현재 슬라이드
    const activeSlide =
        swiperInstance.slides[swiperInstance.activeIndex];

    const currentVideo =
        activeSlide.querySelector('.main-video');

    if (!currentVideo) {
        return;
    }

    currentVideo.play().catch((error) => {
        console.log(error);
    });

    // 영상이 끝나면 다음 슬라이드
    currentVideo.onended = () => {
        swiperInstance.slideNext();
    };
}

//pet-list
const petWrapper = document.querySelector('.pet-list-swiper .swiper-wrapper')

//동물카드 초기화 html에 적힌내용 지우기
petWrapper.innerHTML = ''

//데이터 불러오기
fetch("https://sn0w-02.github.io/WeMeet/js/animal.json")
    .then((response) => response.json())
    .then((animals) => {
        const mainAnimals = animals.slice(0, 9)

        //3마리씩 슬라이드 생성
        for (let i = 0; i < mainAnimals.length; i += 3) {
            const slideAnimals = mainAnimals.slice(i, i + 3)

            const petCards = slideAnimals
                .map((animal) => {
                    const tags = animal.tags
                        .slice(0, 3)
                        .map((tag, index) => {
                            const tagClass =
                                index === 0 ? 'pet-card-tags' : 'pet-card-tags1'

                            return `<span class="${tagClass}">${tag}</span>`
                        })
                        .join('')

                    return `
                        <div class="pet-card">
                            <a href="pages/animal-detail.html?id=${animal.id}">
                                <img src="https://sn0w-02.github.io/WeMeet/${animal.image.replace('../', '')}" alt="${animal.name} 프로필사진">

                                <div class="pet-card-detail">
                                    <h4>${animal.name}</h4>

                                    <p class="pet-card-text">
                                        ${animal.breed}/${animal.ageMonths}/${animal.weight}kg
                                    </p>

                                    <div class="tag-wrapper">
                                        <span class="pet-card-tag">
                                            ${animal.neutered ? '중성화 완료' : '중성화 전'}
                                        </span>

                                        <span class="pet-card-tag">
                                            ${animal.vaccinated ? '예방접종 완료' : '예방접종 전'}
                                        </span>
                                    </div>

                                    <div class="tags-wrapper">
                                        ${tags}
                                    </div>
                                </div>
                            </a>
                        </div>
                    `
                })
                .join('')

            petWrapper.innerHTML += `
                <div class="swiper-slide">
                    <div class="pet-cards">
                        ${petCards}
                    </div>
                </div>
            `
        }

        const petListSwiper = new Swiper('.pet-list-swiper', {
            spaceBetween: 30,

            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },

            pagination: {
                el: '#pet-list .swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '#pet-list .swiper-button-next',
                prevEl: '#pet-list .swiper-button-prev',
            },

            loop: true,
        });
    })
    .catch((error) => {
        console.log(error);
    });
