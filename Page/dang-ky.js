document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.querySelector('.registration-form form');
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = registrationForm.querySelector('input[placeholder="Họ và tên (*)"]').value;
        const gender = registrationForm.querySelector('select').value;
        const dob = registrationForm.querySelector('input[type="date"]').value;
        const address = registrationForm.querySelector('input[placeholder="Địa chỉ (*)"]').value;
        const email = registrationForm.querySelector('input[type="email"]').value;
        const phone = registrationForm.querySelector('input[placeholder="Số điện thoại (*)"]').value;
        const password = registrationForm.querySelector('input[placeholder="Mật khẩu (*)"]').value;
        const confirmPassword = registrationForm.querySelector('input[placeholder="Xác nhận mật khẩu (*)"]').value;
        
        if (!fullName || !gender || !dob || !address || !email || !phone || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin đăng ký.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp.");
            return;
        }

        // Register user
        registerUser({ fullName, gender, dob, address, email, phone, password, role: 'user' });
        alert("Đăng ký thành công! Bạn có thể đăng nhập.");
        window.location.assign('dangnhap.html');
        registrationForm.reset();
    });
});
function registerUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}