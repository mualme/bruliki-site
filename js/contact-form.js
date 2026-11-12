$(document).ready(function () {

  
    const params = new URLSearchParams(window.location.search);

    if (params.get("registered") === "true") {
        $("#registrationSuccessAlert").removeClass("d-none");

        $("#username").val(params.get("name") || "");
        $("#email").val(params.get("email") || "");
      $("#phone").val(params.get("phone") || "");
    }

 
    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#username").val().trim();
        const email = $("#email").val().trim();
        const message = $("#comment").val().trim();
      const phone = $("#phone").val().trim();

        let isValid = true;

    
        if (name.length < 2) {
            $("#username")
                .removeClass("is-valid")
                .addClass("is-invalid");

            $("#name-feedback").text(
                "Please enter your name (minimum 2 characters)."
            );

            isValid = false;
        } else {
            $("#username")
                .removeClass("is-invalid")
                .addClass("is-valid");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $("#email")
                .removeClass("is-valid")
                .addClass("is-invalid");

            $("#email-feedback").text(
                "Please provide a valid email address."
            );

            isValid = false;
        } else {
            $("#email")
                .removeClass("is-invalid")
                .addClass("is-valid");
        }
      const phonePattern = /^\+?[0-9\s()-]{10,20}$/;
      if (!phonePattern.test(phone)) {
        $("#phone")
          .removeClass("is-valid")
          .addClass("is-invalid");
        $("#phone-feedback").text(
          "Please enter a valid phone number."
        );
        isValid = false;
      } else {
        $("#phone")
          .removeClass("is-invalid")
          .addClass("is-valid");
      }

        if (message.length < 10 || message.length > 500) {
            $("#comment")
                .removeClass("is-valid")
                .addClass("is-invalid");

            $("#message-feedback").text(
                "Message must be between 10 and 500 characters."
            );

            isValid = false;
        } else {
            $("#comment")
                .removeClass("is-invalid")
                .addClass("is-valid");
        }

        if (isValid) {
            $("#contactFeedback")
                .removeClass("text-danger")
                .addClass("text-success")
                .text(
                    "Your form has been validated successfully! " +
                    "This is a demo. Your information was not sent or stored."
                );
        } else {
            $("#contactFeedback")
                .removeClass("text-success")
                .addClass("text-danger")
                .text("Please correct the highlighted fields.");
        }

    });

    
    $("#contactForm").on("input", "input, textarea, select", function () {
        $(this).removeClass("is-invalid is-valid");

        $("#contactFeedback")
            .removeClass("text-success text-danger")
            .text("");
    });

});
