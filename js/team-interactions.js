
document.addEventListener('DOMContentLoaded', function () {

    const nameInput = document.getElementById('visitorName');
    const welcomeButton = document.getElementById('welcomeButton');
    const welcomeMessage = document.getElementById('welcomeMessage');

    welcomeButton.addEventListener('click', function () {
        const name = nameInput.value.trim();

        if (name === '') {
            welcomeMessage.textContent = 'Please enter your name.';
        } else {
            welcomeMessage.textContent = 'Welcome to Bruliki, ' + name + '!';
        }
    });

    const themeButton = document.getElementById('themeButton');

    themeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeButton.textContent = 'Switch to light theme';
        } else {
            themeButton.textContent = 'Switch to dark theme';
        }
    });

    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const answerId = button.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            answer.hidden = isOpen;
            button.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    // Task 3: Search products
    const searchInput = document.getElementById('productSearch');
    const productCards = document.querySelectorAll('.product-card');
    const searchCount = document.getElementById('searchCount');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.trim().toLowerCase();
        let count = 0;

        productCards.forEach(function (card) {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const matches = title.includes(searchText);

            card.hidden = !matches;

            if (matches) {
                count++;
            }
        });

        searchCount.textContent = 'Showing ' + count + ' products';
        noResults.hidden = count !== 0;
    });

    const favoriteForm = document.getElementById('favoriteForm');
    const favoriteInput = document.getElementById('favoriteInput');
    const favoriteList = document.getElementById('favoriteList');
    const favoriteCount = document.getElementById('favoriteCount');
    const favoriteError = document.getElementById('favoriteError');

    function updateFavoriteCount() {
        favoriteCount.textContent =
            'Items: ' + favoriteList.querySelectorAll('li').length;
    }

    favoriteForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemName = favoriteInput.value.trim();

        if (itemName === '') {
            favoriteError.textContent = 'Please enter an accessory name.';
            return;
        }

        favoriteError.textContent = '';

        const item = document.createElement('li');
        const itemText = document.createElement('span');
        const removeButton = document.createElement('button');

        itemText.textContent = itemName;
        removeButton.textContent = 'Remove';
        removeButton.type = 'button';

        removeButton.addEventListener('click', function () {
            item.remove();
            updateFavoriteCount();
        });

        item.append(itemText, ' ', removeButton);
        favoriteList.append(item);

        favoriteInput.value = '';
        favoriteInput.focus();
        updateFavoriteCount();
    });

});
