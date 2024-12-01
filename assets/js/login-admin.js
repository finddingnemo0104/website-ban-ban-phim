import { getAdmins } from "./adminData.js";

getAdmins();

document.addEventListener("DOMContentLoaded", () => {
  // Login Form Validation
  const loginForm = document.querySelector(".login-form form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!name || !password) {
      alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    // Authenticate user
    const admin = authenticateUser(name, password);
    if (admin) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(admin)
      );
      redirectToRolePage();
    } else {
      alert("Thông tin đăng nhập không chính xác.");
    }
  });

  // Registration Form Validation
});

// Authenticate user function
function authenticateUser(name, password) {
  const admins = getAdmins();
  return admins.find(
    (admin) =>
      admin.name === name &&
      admin.password === password &&
      admin.role == "admin"
  );
}

// Redirect function based on role
function redirectToRolePage() {
  window.location.href = "quan-ly-don-hang.html";
}
