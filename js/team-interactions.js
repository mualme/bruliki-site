
$(document).ready(function () {

    $("#welcomeButton").click(function () {
        let name = $("#visitorName").val().trim();

        if (name === "") {
            $("#welcomeMessage")
                .text("Please enter your name.")
                .addClass("error-message");
        } else {
            $("#welcomeMessage")
                .text("Welcome to Bruliki, " + name + "!")
                .removeClass("error-message");
        }
    });

    $("#themeButton").click(function () {
        $("body").toggleClass("dark-theme");

        if ($("body").hasClass("dark-theme")) {
            $(this).text("Switch to light theme");
        } else {
            $(this).text("Switch to dark theme");
        }
    });

    $(".faq-answer").hide();

    $(".faq-question").click(function () {
        let answerId = $(this).attr("aria-controls");
        let answer = $("#" + answerId);

        if (answer.is(":visible")) {
            answer.stop(true, true).slideUp(400);
            $(this).attr("aria-expanded", "false");
        } else {
            answer.stop(true, true).slideDown(400);
            $(this).attr("aria-expanded", "true");
        }
    });

    $("#themeButton").click(function () {
        $("#themeStatus").stop(true, true).fadeIn(300);

        setTimeout(function () {
            $("#themeStatus").fadeOut(400);
        }, 1500);
    });

    function filterProducts() {
        let searchText = $("#productSearch").val().toLowerCase().trim();
        let selectedCategory = $("#categoryFilter").val();
        let count = 0;

        $(".product-card").each(function () {
            let productText = $(this).text().toLowerCase();
            let category = $(this).attr("data-category");

            let matchesSearch = productText.includes(searchText);
            let matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                $(this).show();
                count++;
            } else {
                $(this).hide();
            }
        });

        $("#searchCount").text("Showing " + count + " products");

        if (count === 0) {
            $("#noResults").fadeIn(200);
        } else {
            $("#noResults").hide();
        }
    }

    $("#productSearch").on("input", filterProducts);
    $("#categoryFilter").on("change", filterProducts);

    function updateFavoriteCount() {
        let count = $("#favoriteList li").length;

        $("#favoriteCount").text("Items: " + count);

        if (count === 0) {
            $("#favoriteEmpty").show();
        } else {
            $("#favoriteEmpty").hide();
        }
    }

    $("#favoriteForm").on("submit", function (event) {
        event.preventDefault();

        let itemName = $("#favoriteInput").val().trim();

        if (itemName === "") {
            $("#favoriteError").text("Please enter an accessory name.");
            return;
        }

        $("#favoriteError").text("");

        let newItem = $("<li>");
        let itemText = $("<span>").text(itemName);

        let removeButton = $("<button>")
            .attr("type", "button")
            .addClass("remove-favorite")
            .text("Remove");

        newItem.append(itemText, " ", removeButton);

        $("#favoriteList").append(newItem);

        $("#favoriteInput").val("");

        updateFavoriteCount();
    });

    $("#favoriteList").on("click", ".remove-favorite", function () {
        $(this).closest("li").remove();

        updateFavoriteCount();
    });

    updateFavoriteCount();

});
