const { jsPDF } = window.jspdf;

const hamburgerMenu = document.getElementById("hamburger-menu");

// let, const, var

// functions

// events

hamburgerMenu.addEventListener('click', () => {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("hidden");
});


const businessEmailInput = document.getElementById("business-email");
const clientEmailInput = document.getElementById("client-email");

const businessNameInput = document.getElementById("business-name");
const clientNameInput = document.getElementById("client-name");

function valueIsEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
}

businessEmailInput.addEventListener('blur', () => {
    if (valueIsEmail(businessEmailInput.value)) {
        businessEmailInput.classList.remove("invalid");
        businessEmailInput.classList.add("valid");
    } else {
        businessEmailInput.classList.remove("valid");
        businessEmailInput.classList.add("invalid");
    }
});

businessNameInput.addEventListener('blur', () => {
     const errorMessage = businessNameInput.previousElementSibling.querySelector(".error-message");
    if (businessNameInput.value.trim() !== "") {
        businessNameInput.classList.remove("invalid");
        businessNameInput.classList.add("valid");
        errorMessage.style.display = "none";
    } else {
        businessNameInput.classList.remove("valid");
        businessNameInput.classList.add("invalid");
        errorMessage.style.display = "inline";
    }
});

clientNameInput.addEventListener('blur', () => {
    if (clientNameInput.value.trim() !== "") {
        clientNameInput.classList.remove("invalid");
        clientNameInput.classList.add("valid");
    } else {
        clientNameInput.classList.remove("valid");
        clientNameInput.classList.add("invalid");
    }
});

const quoteForm = document.getElementById("quote-form");

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const quoteData = new FormData(quoteForm);
    const quoteDateJson = Object.fromEntries(quoteData.entries());

    const quoteDoc = new jsPDF();

    for (let [key, value] of Object.entries(quoteDateJson)) {
        quoteDoc.text(`${key} — ${value}`, 10, 10 + (10 * Object.keys(quoteDateJson).indexOf(key)));
    }

    quoteDoc.save("quote.pdf");
});