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