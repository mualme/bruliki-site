
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            const password = form.querySelector('#password');
            const confirmPassword = form.querySelector('#confirmPassword');

            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Passwords do not match!');
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }

    
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();


                if (form.id === 'registerForm') {
                    const firstName = form.querySelector('#firstName').value;
                    const lastName = form.querySelector('#lastName').value;
                    const email = form.querySelector('#regEmail').value;
                    const fullName = firstName + ' ' + lastName;

                    window.location.href =
                        `contact.html?registered=true&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
                } else {
        
                    window.location.href = 'demo-result.html';
                }
            }

            form.classList.add('was-validated');
        }, false);

        form.addEventListener('reset', () => {
            form.classList.remove('was-validated');

            const cp = form.querySelector('#confirmPassword');
            if (cp) {
                cp.setCustomValidity('');
            }
        });
    });
});

