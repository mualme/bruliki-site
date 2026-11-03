
$(document).ready(function () {

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


    function applyTheme(theme) {
        const isDark = theme === "dark";

        $("body").toggleClass("dark-theme", isDark);

        if (isDark) {
            $("#themeIcon").text("☀");
            $("#themeButton").attr(
                "aria-label",
                "Switch to light theme"
            );
        } else {
            $("#themeIcon").text("☾");
            $("#themeButton").attr(
                "aria-label",
                "Switch to dark theme"
            );
        }
    }

    const savedTheme = localStorage.getItem("brulikiTheme") || "light";
    applyTheme(savedTheme);

    $("#themeButton").on("click", function () {
        const isDark = !$("body").hasClass("dark-theme");
        const newTheme = isDark ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("brulikiTheme", newTheme);
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


    function updateFavoriteCount() {
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

        updateFavoriteCount();
    });
$("#favoriteSuccess")
    .text("Item added to favourites!")
    .stop(true, true)
    .fadeIn(300)
    .delay(1500)
    .fadeOut(300);
    
    $("#favoriteList").on("click", ".remove-favorite", function () {
        $(this).closest("li").remove();
        updateFavoriteCount();
    });

    updateFavoriteCount();

});
