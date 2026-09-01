//< !--Swiper JS-- >
    <script src="https://cdn.jsdelivr.net/npm/swiper@14.0.1/swiper-bundle.min.js"></script>

//<!--Initialize Swiper-- >
    <script>
        const progressCircle = document.querySelector('.autoplay-progress svg');
        const progressContent = document.querySelector('.autoplay-progress span');
        var swiper = new Swiper('.mySwiper', {
            spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
        clickable: true,
            },
        navigation: {
            nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
            },
        on: {
            slideChange: function () {
            playCurrentVideo(this);
                }
            },
        });

        function playCurrentVideo(swiperInstance) {
            const allVideos = document.querySelectorAll('.swiper-slide video');
            allVideos.forEach(video => {
            video.pause();
        video.currentTime = 0;
        video.onended = null;
            });

        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const currentVideo = activeSlide.querySelector('video');

        if (currentVideo) {
            currentVideo.play().catch(error => {
                console.log(error);
            });
        currentVideo.onended = function () {
            swiperInstance.slideNext();
                };
            }
        }

        window.addEventListener('load', function () {
            playCurrentVideo(swiper);
        })
    </script>