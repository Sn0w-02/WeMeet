//html 요소
//gnb
const menuBtn = document.querySelector('.menu-btn'),
    gnb = document.querySelector('.gnb'),
    gnbItems = document.querySelectorAll('.gnb-item');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    gnb.classList.toggle('open');

    const isOpen = gnb.classList.contains('open');

    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? '메뉴닫기' : '메뉴열기');

    if (isOpen) {
        closeAllMenu()
    }
});

gnbItems.forEach((item) => {
    const link = item.querySelector('.gnb-link');
    const subMenu = item.querySelector('.sub-menu');

    link.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {

            if (!subMenu) {
                return;
            }

            event.preventDefault();

            const isActive = item.classList.contains('active');

            closeAllMenu();

            if (!isActive) {
                item.classList.add('active');
            }
        }
    });
});

function closeAllMenu() {
    gnbItems.forEach((item) => {
        item.classList.remove('active');
    });
}

window.addEventListener('resize', () => {
    closeAllMenu();

    if (window.innerWidth > 768) {
        gnb.classList.remove('open');
        menuBtn.classList.remove('active');

        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', '메뉴열기');
    }
});


//예약하기
const reservationBtn = document.querySelector('.reservation-btn'),
    reservationModal = document.querySelector('.reservation-modal'),
    reservationClose = document.querySelector('.reservation-close'),
    reservationForm = document.querySelector('#reservation-form'),
    reservationWarning = document.querySelector('.reservation-warning'),
    completeModal = document.querySelector('.reservation-complete-modal'),
    confirmBtn = document.querySelector('.reservation-confirm');

//예약하기 버튼
reservationBtn.addEventListener('click', () => {
    reservationModal.classList.add('active');
})