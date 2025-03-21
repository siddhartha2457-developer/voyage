document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token"); // Fetch JWT token

    if (!token) {
        alert("Unauthorized access! Please log in.");
        window.location.href = "admin-login.html"; // Redirect to login page
    }
});
