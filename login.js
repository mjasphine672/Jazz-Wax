const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 🔐 Change these to your own
    const ADMIN_USER = "QJazz";
    const ADMIN_PASS = "M@Jazz2005";

    if(username === ADMIN_USER && password === ADMIN_PASS){
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("errorMsg").textContent = "Invalid login details!";
    }
});