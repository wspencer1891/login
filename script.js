document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById ('show-hide')

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    emailInput.addEventListener('blur', function () {
        validateEmail();
    });

    emailInput.addEventListener('change', function () {
        clearError(emailError);
    });

    passwordInput.addEventListener('change', function () {
        clearError(passwordError);
    });

    confirmPasswordInput.addEventListener('change', function () {
        clearError(confirmPasswordError);
    });

    showHideButton.addEventListener ('click', function () {

        if (passwordInput.type == 'password') {

            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            
        }else{

            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';

        }
        
    })



    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatched = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatched) {
            saveToLocalStorage ();
            alert('Has ingresado a tu cuenta');
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();
        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un correo electrónico válido');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
            showError(passwordError, 'La contraseña debe tener más de 6 caracteres');
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        if (passwordValue !== confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas ingresadas no coinciden');
            return false;
        }
        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value;;
        localStorage.setItem ('email', emailValue);
        const body = bodyBuilderJson();
        console.log(body)
        
    }

    
    function bodyBuilderJson (params) {
        return {
            'email': emailInput.value, 
            'password': passwordInput.value
        }
        
    }
});
