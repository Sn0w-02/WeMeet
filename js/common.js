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
    confirmBtn = document.querySelector('.reservation-confirm'),
    visitDate = document.querySelector('#visit-data');

//방문일자 이전 날짜 선택 방지
const today = new Date(),
    year = today.getFullYear(),
    month = String(today.getMonth() + 1).padStart(2, '0'),
    day = String(today.getDate()).padStart(2, '0');

visitDate.min = `${year}-${month}-${day}`;

//예약하기 버튼
reservationBtn.addEventListener('click', () => {
    reservationModal.classList.add('active');
})

//예약 모달 닫기
reservationClose.addEventListener('click', () => {
    reservationModal.classList.remove('active');
    reservationWarning.classList.remove('active');
})
reservationModal.addEventListener('click', (event) => {
    if (event.target === reservationModal) {
        reservationModal.classList.remove('active');
        reservationWarning.classList.remove('active');
    }
})

//예약 신청
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = document.querySelector('#user-name').value.trim();
    const userphone = document.querySelector('#user-phone').value.trim();
    const animalBreed = document.querySelector('#animal-breed').value.trim();
    const visitDateValue = visitDate.value;
    const purpose = document.querySelector('input[name="purpose"]:checked');

    //미작성 항목 확인
    if (
        userName === '' ||
        userphone === '' ||
        animalBreed === '' ||
        visitDateValue === '' ||
        !purpose
    ) {
        reservationWarning.classList.add('active');
        return;
    }

    //경고 문구 숨김
    reservationWarning.classList.remove('active');

    //예약 모달 닫기
    reservationModal.classList.remove('active');

    //완료 모달 열기
    completeModal.classList.add('active');
})

//예약 완료 확인 버튼
confirmBtn.addEventListener('click', () => {
    completeModal.classList.remove('active');

    //작성내용 초기화
    reservationForm.reset();

    //경고 문구 초기화
    reservationWarning.classList.remove('active');
})