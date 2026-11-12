$(document).ready(function () {

    const ACCOUNT_KEY = "brulikiAccount";
    const SESSION_KEY = "brulikiLoggedIn";

    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        const email = $("#loginEmail").val().trim().toLowerCase();
        const password = $("#loginPassword").val();

        let isValid = true;

        $("#loginEmail, #loginPassword").removeClass("is-invalid is-valid");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $("#loginEmail").addClass("is-invalid");
            isValid = false;
        } else {
            $("#loginEmail").addClass("is-valid");
        }

        if (password === "") {
            $("#loginPassword").addClass("is-invalid");
            isValid = false;
        } else {
            $("#loginPassword").addClass("is-valid");
        }

        if (!isValid) {
            $("#loginFeedback")
                .removeClass("text-success")
                .addClass("text-danger")
                .text("Please complete all fields correctly.");
            return;
        }

        const account = JSON.parse(localStorage.getItem(ACCOUNT_KEY));

        if (!account || account.email !== email || account.password !== password) {
            $("#loginFeedback")
                .removeClass("text-success")
                .addClass("text-danger")
                .text("Incorrect email or password. Please try again.");
            return;
        }

        localStorage.setItem(SESSION_KEY, "true");
        window.location.href = "profile.html";
    });


    if (window.location.pathname.endsWith("profile.html")) {

        const isLoggedIn = localStorage.getItem(SESSION_KEY) === "true";
        const account = JSON.parse(localStorage.getItem(ACCOUNT_KEY));

        if (!isLoggedIn || !account) {
            window.location.href = "login.html";
            return;
        }

        $("#profileName").text(account.name);
        $("#profileEmail").text(account.email);
        $("#profilePhone").text(account.phone);
        $("#profileCountry").text(account.country);
    }


    $("#logoutButton").on("click", function () {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = "login.html";
    });

});
