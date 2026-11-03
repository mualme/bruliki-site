

$(document).ready(function () {

    console.log("jQuery is ready!");

    $("#welcomeButton").on("click", function () {
        const name = $("#visitorName").val().trim();

        if (name === "") {
            $("#welcomeMessage")
                .text("Please enter your name.")
                .addClass("error-message");
        } else {
            $("#welcomeMessage")
                .removeClass("error-message")
                .text("Welcome to Bruliki, " + name + "!");
        }
    });

    $("#themeButton").on("click", function () {
        $("body").toggleClass("dark-theme");

        const isDark = $("body").hasClass("dark-theme");

        if (isDark) {
            $(this).text("Switch to light theme");
        } else {
            $(this).text("Switch to dark theme");
        }

        $("#themeStatus")
            .stop(true, true)
            .text("Theme changed successfully!")
            .fadeIn(300)
            .delay(1200)
            .fadeOut(500);
    });


    $(".faq-answer").hide();

    $(".faq-question").on("click", function () {
        const button = $(this);
        const answerId = button.attr("aria-controls");
        const answer = $("#" + answerId);
        const isOpen = button.attr("aria-expanded") === "true";

        answer.stop(true, true).slideToggle(300);

        button.attr("aria-expanded", String(!isOpen));
    });


    function filterProducts() {
        const searchText = $("#productSearch").val().trim().toLowerCase();
        const selectedCategory = $("#categoryFilter").val();

        let count = 0;

        $(".product-card").each(function () {
            const card = $(this);
            const productName = card.find("h3").text().toLowerCase();
            const productCategory = card.attr("data-category");

            const matchesSearch = productName.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.show();
                count++;
            } else {
                card.hide();
            }
        });

        $("#searchCount").text("Showing " + count + " products");

        if (count === 0) {
            $("#noResults").show();
        } else {
            $("#noResults").hide();
        }
    }

    $("#productSearch").on("input", filterProducts);
    $("#categoryFilter").on("change", filterProducts);


    // TASK 4: Dynamic Favourite List
    function updateFavoriteList() {
        const count = $("#favoriteList li").length;

        $("#favoriteCount").text("Items: " + count);

        if (count === 0) {
            $("#favoriteEmpty").show();
        } else {
            $("#favoriteEmpty").hide();
        }
    }

    $("#favoriteForm").on("submit", function (event) {
        event.preventDefault();

        const itemName = $("#favoriteInput").val().trim();

        if (itemName === "") {
            $("#favoriteError").text("Please enter an accessory name.");
            return;
        }

        $("#favoriteError").text("");

        const newItem = $("<li></li>");
        const itemText = $("<span></span>").text(itemName);

        const removeButton = $("<button></button>")
            .attr("type", "button")
            .addClass("remove-favorite")
            .text("Remove");

        newItem.append(itemText, " ", removeButton);

        $("#favoriteList").append(newItem);

        $("#favoriteInput").val("").focus();

        updateFavoriteList();
    });

    $("#favoriteList").on("click", ".remove-favorite", function () {
        $(this).closest("li").remove();

        updateFavoriteList();
    });

    updateFavoriteList();

});
