// =======================
// SERVICES PAGE
// =======================

const cards = document.querySelectorAll(".service-card");
const totalDisplay = document.getElementById("total");

if (cards.length > 0 && totalDisplay) {
    let total = 0;
    let selectedServices = [];

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const price = Number(card.dataset.price);
            const name = card.querySelector("h3").textContent;

            if (card.classList.contains("active")) {
                card.classList.remove("active");
                total -= price;
                selectedServices = selectedServices.filter(s => s !== name);
            } else {
                card.classList.add("active");
                total += price;
                selectedServices.push(name);
            }

            totalDisplay.textContent = total;
        });
    });

    window.goToBooking = function () {
        localStorage.setItem("total", total);
        localStorage.setItem("services", selectedServices.join(", "));
        window.location.href = "booking.html";
    };
}

// =======================
// BOOKING PAGE
// =======================

const bookingTotal = document.getElementById("bookingTotal");

if (bookingTotal) {
    bookingTotal.textContent = localStorage.getItem("total") || 0;
}

// =======================
// FORM SUBMIT
// =======================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const date = document.getElementById("date").value;
        const services = localStorage.getItem("services");
        const total = localStorage.getItem("total");

        const booking = {
            name,
            email: document.getElementById("email").value,
            phone,
            date,
            services,
            total,
            status: "Pending"
        };

        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // 📲 WHATSAPP MESSAGE
        const message = `Hello JazzWaxAesthetics 💙
I have booked an appointment.

Name: ${name}
Phone: ${phone}
Date: ${date}
Services: ${services}
Total: Ksh ${total}`;

        // 👉 YOUR BUSINESS NUMBER HERE (replace)
        const businessNumber = "254798404576";

        const whatsappURL = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

        // OPEN WHATSAPP
        window.open(whatsappURL, "_blank");

        // REDIRECT
        window.location.href = "thankyou.html";
    });
}