document.addEventListener('DOMContentLoaded', () => {

    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');

        function validatePasswords() {
            if (!password || !confirmPassword) return;

            if (password.value === '') {
                password.setCustomValidity('');
            } else if (
                password.value.length < 8 ||
                !/[A-Z]/.test(password.value) ||
                !/[a-z]/.test(password.value) ||
                !/[0-9]/.test(password.value) ||
                !/[^A-Za-z0-9]/.test(password.value)
            ) {
                password.setCustomValidity('Password is not strong enough.');
            } else {
                password.setCustomValidity('');
            }

            if (confirmPassword.value === '') {
                confirmPassword.setCustomValidity('');
            } else if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match!');
            } else {
                confirmPassword.setCustomValidity('');
            }
        }

        if (password && confirmPassword) {
            password.addEventListener('input', validatePasswords);
            confirmPassword.addEventListener('input', validatePasswords);
        }

        form.addEventListener('submit', event => {
            event.preventDefault();

            validatePasswords();
            form.classList.add('was-validated');

            if (!form.checkValidity()) {
                event.stopPropagation();
                return;
            }

            if (form.id === 'registerForm') {
                const firstName = form.querySelector('#firstName').value.trim();
                const lastName = form.querySelector('#lastName').value.trim();
                const email = form.querySelector('#regEmail').value.trim().toLowerCase();
                const phone = form.querySelector('#regPhone').value.trim();
                const passwordValue = password.value;
                const country = form.querySelector('#country').value;

                const account = {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    phone: phone,
                    password: passwordValue,
                    country: country
                };

                const existingAccount = JSON.parse(
                    localStorage.getItem('brulikiAccount') || 'null'
                );

                if (existingAccount && existingAccount.email === email) {
                    alert('An account with this email already exists.');
                    return;
                }

                localStorage.setItem(
                    'brulikiAccount',
                    JSON.stringify(account)
                );

                const params = new URLSearchParams({
                    registered: 'true',
                    name: account.name,
                    email: account.email,
                    phone: account.phone
                });

                window.location.href = `contact.html?${params.toString()}`;
            }
        });

        form.addEventListener('reset', () => {
            form.classList.remove('was-validated');

            if (password) password.setCustomValidity('');
            if (confirmPassword) confirmPassword.setCustomValidity('');
        });
    });

});
