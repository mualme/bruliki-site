
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');

 
        function validatePasswords() {
            if (!password || !confirmPassword) return;

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
            validatePasswords();
            form.classList.add('was-validated');

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }


            if (form.id === 'registerForm') {
                event.preventDefault();

                const firstName = form.querySelector('#firstName').value.trim();
                const lastName = form.querySelector('#lastName').value.trim();
                const email = form.querySelector('#regEmail').value.trim();
                const fullName = `${firstName} ${lastName}`;

                const params = new URLSearchParams({
                    registered: 'true',
                    name: fullName,
                    email: email
                });

                window.location.href = `contact.html?${params.toString()}`;
            }

        });

        form.addEventListener('reset', () => {
            form.classList.remove('was-validated');

            if (confirmPassword) {
                confirmPassword.setCustomValidity('');
            }

            setTimeout(() => {
                form.classList.remove('was-validated');
            }, 0);
        });
    });
});
