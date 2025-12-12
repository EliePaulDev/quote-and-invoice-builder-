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

test = {
    name: "Test Business",
    email: "   test",
    address: "123 Test St",
    phone: "555-1234"
}

// Object.keys(test) = ["business-name", "business-email"]
// test["business-name"] = "Test Business", test["business-email"] = "   test"


// {"business-name": "Test Business", "business-email": "   test"}


function getSectionData(prefix, data) {
    return Object.keys(data).filter(key => key.startsWith(prefix)).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});
}     


function generatePDF(quoteDoc, businessInfo, clientInfo, quoteInfo) {
    console.log("Generating PDF...");
    quoteDoc.text(businessInfo["business-name"], 100, 10, { align: "center" });
    quoteDoc.text(businessInfo["business-address"], 100, 20, { align: "center" });
    quoteDoc.text(businessInfo["business-email"], 100, 30, { align: "center" });
    quoteDoc.text(businessInfo["business-phone"], 100, 40, { align: "center" });

    quoteDoc.line(10, 50, 200, 50);

    quoteDoc.text(`Client: ${clientInfo["client-name"]}`, 10, 60);
    quoteDoc.text(`Email: ${clientInfo["client-email"]}`, 10, 70);
    quoteDoc.text(`Address: ${clientInfo["client-address"]}`, 10, 80);
    quoteDoc.text(`Phone: ${clientInfo["client-phone"]}`, 10, 90);

    quoteDoc.line(10, 100, 200, 100);

    quoteDoc.text(`Quote Details:`, 10, 110);


    for (let [key, value] of Object.entries(quoteInfo)) {
        quoteDoc.text(`${key} — ${value}`, 10, 120 + (10 * Object.keys(quoteInfo).indexOf(key)));
    }

    quoteDoc.save("quote.pdf");

}

// if else statement

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const quoteData = new FormData(quoteForm);
    const quoteDataJson = Object.fromEntries(quoteData.entries());

    const businessInfo = getSectionData("business-", quoteDataJson);

    const clientInfo = getSectionData("client-", quoteDataJson);

    let pageInfo = document.location.pathname === "/invoice.html" ? "invoice-" : "quote-";

    const quoteInfo = getSectionData(pageInfo, quoteDataJson);

    const quoteDoc = new jsPDF();

    generatePDF(quoteDoc, businessInfo, clientInfo, quoteInfo);

  
});