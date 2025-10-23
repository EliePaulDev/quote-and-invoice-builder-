const hamburgerMenu = document.getElementById("hamburger-menu");

// let, const, var

// functions

// events

hamburgerMenu.addEventListener('click', () => {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("hidden");
});