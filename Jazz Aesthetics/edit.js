document.addEventListener("DOMContentLoaded", () => {

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const index = localStorage.getItem("editIndex");

    if (index === null) {
        window.location.href = "admin.html";
        return;
    }

    const booking = bookings[index];

    document.getElementById("editName").value = booking.name;
    document.getElementById("editEmail").value = booking.email;
    document.getElementById("editPhone").value = booking.phone;
    document.getElementById("editDate").value = booking.date;

    document.getElementById("editServices").textContent =
        "Services: " + (booking.services || "None");

    document.getElementById("editTotal").textContent = booking.total;

    document.getElementById("editForm").addEventListener("submit", function(e){
        e.preventDefault();

        bookings[index] = {
            ...booking,
            name: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            phone: document.getElementById("editPhone").value,
            date: document.getElementById("editDate").value
        };

        localStorage.setItem("bookings", JSON.stringify(bookings));

        window.location.href = "admin.html";
    });

});