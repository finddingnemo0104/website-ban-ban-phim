function getCustomer() { //    lấy dữ liệu từ loacalStorage
  if (
    localStorage.getItem("customers") === null || 
    JSON.parse(localStorage.getItem("customers")).length === 0 
  ) {
    localStorage.setItem("customers", JSON.stringify(listCustomer)); // tự khởi tạo tài khoản từ listCustomer
  }
  return JSON.parse(localStorage.getItem("customers")); // lưu vô localStorage
}

document.addEventListener("DOMContentLoaded", () => { 
  // kiếm form trong class login-form
  const loginForm = document.querySelector(".login-form form"); 
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const phone = loginForm.querySelector('input[type="text"]').value;  
    const password = loginForm.querySelector('input[type="password"]').value;

    
    
    // Hàm xác thực thông tin của khách hàng
    const customer = authenticateUser(phone, password);
    if (customer) {
      localStorage.setItem("currentUser", JSON.stringify(customer));
      redirectToRolePage(customer.role);
     
    } else {
      alert("Thông tin đăng nhập không chính xác.");
    }
  });

});

// xác thực thôn tin user dựa trên sdt & pass
function authenticateUser(phone, password) {
  const customers = getCustomer();
  return customers.find( // duyệt danh sách để kiểm tra điều kiện
    (customer) => customer.phone === phone && customer.password === password
  );
}

// điều hướng đến trang tương ứng
function redirectToRolePage(role) {
  if (role === "admin") {
    window.location.href = "quan-ly-don-hang.html"; // Replace with actual admin page URL
  } else {
    window.location.href = "index.html"; // Replace with actual index/home page URL
  }
}

// hàm quên pass
function forgotPassword() {
  document.getElementById("formLogin").style.display = "none"; // ẩn trang login
  document.getElementById("formForgotPassword").style.display = "block"; // mở trang quên mật khẩu
}

function isValidPassword(password) { // điều kiện khi đặt pass
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

// tạo password mới
function createNewPassword(e) {
  e.preventDefault(); // ngăn hành vi mặc định của submit
  phone = document.getElementById("phone").value;
  newPassWord = document.getElementById("newPassword").value;
  confirmNewPassWord = document.getElementById("confirmNewPassword").value;

  const customers = getCustomer();
  const customer = customers.find((customer) => customer.phone === phone); // check sdt danh sách
  indexCustomer = listCustomer.findIndex( // vị trí của user trong  ds
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
function updateCustomerPassword(phone, newPassWord) {
  
  const customers = getCustomer(); 
  const index = customers.findIndex((customer) => customer.phone === phone); // Tìm vị trí của khách hàng theo số điện thoại

  if (index !== -1) {
    customers[index].password = newPassWord; 

    localStorage.setItem("customers", JSON.stringify(customers));// Lưu lại danh sách khách hàng vào localStorage
    return true; 
  } else {
    return false; // Không tìm thấy khách hàng
  }
}



// Thêm 1 khách hàng
function addCustomerIntoLocalStorage(customer) {
  const listCustomer = getCustomer();
  listCustomer.push(customer);// thêm

  localStorage.setItem("customers", JSON.stringify(listCustomer));
}

// --------------------------------------------------------------------------------- //


