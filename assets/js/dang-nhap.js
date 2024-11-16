function getCustomer() {
  if (
    localStorage.getItem("customers") === null ||
    JSON.parse(localStorage.getItem("customers")).length === 0
  ) {
    localStorage.setItem("customers", JSON.stringify(listCustomer));
  }
  return JSON.parse(localStorage.getItem("customers"));
}

document.addEventListener("DOMContentLoaded", () => {
  // Login Form Validation
  const loginForm = document.querySelector(".login-form form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const phone = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!phone || !password) {
      alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    if (phone === "0869043004" && password === "thu012345") {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.role === "admin") {
        document.getElementById(
          "admin-email"
        ).innerText = `Email: ${currentUser.email}`;
      } else {
        // Nếu không phải admin, điều hướng về trang đăng nhập
        window.location.href = "dangnhap.html";
      }
      displayOrders();

      redirectToRolePage("admin");

      return;
    }
    //Authenticate user
    const customer = authenticateUser(phone, password);
    if (customer) {
      localStorage.setItem("currentUser", JSON.stringify(customer));
      redirectToRolePage(customer.role);
      window.location.href("user.html");
    } else {
      alert("Thông tin đăng nhập không chính xác.");
    }
  });

  // Registration Form Validation
});

// Authenticate user function
function authenticateUser(phone, password) {
  const customers = getCustomer();
  return customers.find(
    (customer) => customer.phone === phone && customer.password === password
  );
}

// Register user function with localStorage

// Redirect function based on role
function redirectToRolePage(role) {
  if (role === "admin") {
    window.location.href = "quan-ly-don-hang.html"; // Replace with actual admin page URL
  } else {
    window.location.href = "index.html"; // Replace with actual index/home page URL
  }
}

// Forgot password
function forgotPassword() {
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("formForgotPassword").style.display = "block";
}

function isValidPassword(password) {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[\W_]/.test(password)
  ) {
    return false;
  }
  return true;
}

// Create new password
function createNewPassword(e) {
  e.preventDefault();
  phone = document.getElementById("phone").value;
  newPassWord = document.getElementById("newPassword").value;
  confirmNewPassWord = document.getElementById("confirmNewPassword").value;

  const customers = getCustomer();
  const customer = customers.find((customer) => customer.phone === phone);
  indexCustomer = listCustomer.findIndex(
    (customer) => customer.phone === phone
  );

  if (!customer) {
    alert("Số điện thoại này chưa được đăng ký !");
  } else if (!isValidPassword(newPassWord)) {
    alert(`Mật khẩu không hợp lệ !\nMật khẩu cần có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.`);
  } else if (newPassWord != confirmNewPassWord) {
    alert("Mật khẩu không trùng khớp !");
  } else {
    customers[indexCustomer].password = newPassWord;
    localStorage.setItem("customers", JSON.stringify(customers));
    alert("Tạo mật khẩu mới thành công !");
    document.getElementById("formForgotPassword").style.display = "none";
    document.getElementById("formLogin").style.display = "block";
  }
}

// Update customer infomation into localStorage
function addCustomerIntoLocalStorage(customer) {
  const listCustomer = getCustomer();
  listCustomer.push(customer);

  localStorage.setItem("customers", JSON.stringify(listCustomer));
}
// --------------------------------------------------------------------------------- //


