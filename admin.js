// 🔐 PROTECT ADMIN PAGE
if(localStorage.getItem("isAdminLoggedIn") !== "true"){
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const table = document.getElementById("bookingTable");
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    function renderBookings() {
        table.innerHTML = "";

        if (bookings.length === 0) {
            table.innerHTML = "<tr><td colspan='8'>No bookings yet</td></tr>";
            return;
        }

        bookings.forEach((b, index) => {

            const status = b.status || "Pending";

            const row = document.createElement("tr");
            if (status === "Finished") row.classList.add("finished");

            row.innerHTML = `
                <td>${b.name}</td>
                <td>${b.email}</td>
                <td>${b.phone}</td>
                <td>${b.date}</td>
                <td>${b.services || "None"}</td>
                <td>Ksh ${b.total}</td>
                <td>${status}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editBooking(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteBooking(${index})">Delete</button>
                    <button class="finish-btn" onclick="finishBooking(${index})">Finish</button>
                </td>
            `;

            table.appendChild(row);
        });
    }

    // DELETE
    window.deleteBooking = function(index) {
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderBookings();
    };

    // FINISH
    window.finishBooking = function(index) {
        bookings[index].status = "Finished";
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderBookings();
    };

    // EDIT → NEW PAGE
    window.editBooking = function(index) {
        localStorage.setItem("editIndex", index);
        window.location.href = "edit.html";
    };

    renderBookings();
});

function logout(){
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "login.html";
}