//html 요소
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