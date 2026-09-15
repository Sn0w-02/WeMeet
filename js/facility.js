const schoolItems = document.querySelectorAll('.school-item');

const schoolMainImg = document.querySelector('#schoolMainImg');
const schoolTitle = document.querySelector('.school-title');
const schoolDescription = document.querySelector('.school-description');

schoolItems.forEach(function (item) {
    item.addEventListener('click', function () {
        schoolMainImg.src = item.dataset.image;
        schoolTitle.textContent = item.dataset.title;
        schoolDescription.textContent = item.dataset.description;

        schoolItems.forEach(function (menu) {
            menu.classList.remove('active');
        });

        item.classList.add('active');
    });
});