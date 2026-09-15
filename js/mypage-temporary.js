const tabBtns = document.querySelectorAll(".side-tab-btn");
const tabContents = document.querySelectorAll(".history, .point");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(item => {
            item.classList.remove("active");
        });

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        btn.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active");
    });
});