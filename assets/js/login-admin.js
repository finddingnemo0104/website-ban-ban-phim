document.addEventListener("DOMContentLoaded", () => {
    // Login Form Validation
    const loginForm = document.querySelector('.login-form form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const phone = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        if (!phone || !password) {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
            return;
        }
        // Authenticate user
        const user = authenticateUser(phone, password);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify({ phone, role: user.role, email: user.email, status: user.status }));
            redirectToRolePage();
        } else {
            alert("Thông tin đăng nhập không chính xác.");
        }
    });

    // Registration Form Validation
   
});

// Authenticate user function
function authenticateUser(phone, password) {
    const users = JSON.parse(localStorage.getItem('customers')) || [];
    return users.find(user => user.phone === phone && user.password === password && user.role == "admin");
}

// Register user function with localStorage


// Redirect function based on role
function redirectToRolePage() {
    window.location.href = "quan-ly-don-hang.html";
}