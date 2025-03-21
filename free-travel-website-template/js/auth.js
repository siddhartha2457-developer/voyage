<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token"); // Fetch JWT token

    if (!token) {
        alert("Unauthorized access! Please log in.");
        window.location.href = "admin-login.html"; // Redirect to login page
    }
});
=======
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token"); // Fetch JWT token

    if (!token) {
        alert("Unauthorized access! Please log in.");
        window.location.href = "admin-login.html"; // Redirect to login page
    }
});
>>>>>>> e0ce53f95e62a1356a31d6f38e92455d48aabc8d
