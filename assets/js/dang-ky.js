import { vietnameseProvinces } from "../vietnamese-provinces-data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Chèn dữ liệu thành phố
  populateProvinces();

  // Chèn dữ liệu quận vào form chọn quận khi chọn xong thành phố
  document
    .getElementById("province-input")
    .addEventListener("change", function () {
      const selectedProvinceCode = this.value;
      if (selectedProvinceCode === "") {
        document.getElementById("district-input").required = false;
      }

      populateDistricts(selectedProvinceCode);
    });

  document
    .getElementById("district-input")
    .addEventListener("change", function () {
      const selectedDistrictCode = this.value;
      if (selectedDistrictCode === "") {
        document.getElementById("ward-input").required = false;
        document.getElementById("address").required = false;
      }
      populateWards(selectedDistrictCode);
    });

  const registrationForm = document.querySelector(".registration-form form");
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = registrationForm.querySelector(
      'input[placeholder="Họ và tên (*)"]'
    ).value;
    const gender = registrationForm.querySelector("select").value;
    const dob = registrationForm.querySelector('input[type="date"]').value;
    const address = registrationForm.querySelector(
      'input[placeholder="Địa chỉ"]'
    ).value;
    const email = registrationForm.querySelector('input[type="email"]').value;
    const phone = registrationForm.querySelector(
      'input[placeholder="Số điện thoại (*)"]'
    ).value;
    const password = registrationForm.querySelector(
      'input[placeholder="Mật khẩu (*)"]'
    ).value;
    const confirmPassword = registrationForm.querySelector(
      'input[placeholder="Xác nhận mật khẩu (*)"]'
    ).value;

    if (!name || !gender || !dob || !phone || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin đăng ký.");
      return;
    }

    if (!isValidName(name)) {
      alert("Tên không hợp lệ !");
      return;
    }

    const customers = getCustomer();

    if (email || email != "") {
      if (!isValidEmail(email)) {
        alert("Email không hợp lệ !");
        return;
      } else {
        const customer = customers.find((customer) => customer.email === email);
        if (customer) {
          alert("Email này đã được đăng ký !");
          return;
        }
      }
    }

    if (!isValidPhoneNumber(phone)) {
      alert("Số điện thoại không hợp lệ !");
      return;
    } else {
      const customer = customers.find((customer) => customer.phone === phone);
      if (customer) {
        alert("Số điện thoại này đã được đăng ký !");
        return;
      }
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    if (!isValidPassword(password)) {
      alert(
        `Mật khẩu không hợp lệ !\nMật khẩu cần có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.`
      );
      return;
    }

    // Register customer
    registerCustomer({
      ID: generateCustomerID(),
      name,
      gender,
      email,
      phone,
      dob,
      address,
      status: true,
      password,
      role: "customer",
    });
    alert("Đăng ký thành công! Bạn có thể đăng nhập.");
    window.location.assign("dangnhap.html");
    registrationForm.reset();
  });
});
function registerCustomer(customer) {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));
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

function isValidPhoneNumber(phone) {
  const regex = /^\d{10,11}$/;
  return regex.test(phone);
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidName(name) {
  const regex = /^[A-Za-zÀ-ỹ\s']+$/u;
  return regex.test(name);
}

// Generate customer ID
function generateCustomerID() {
  const listCustomer = getCustomer();
  const lastCustomer = listCustomer[listCustomer.length - 1];
  const lastCustomerID = parseInt(lastCustomer.ID.split("#KH")[1]);
  const numberID = lastCustomerID + 1;
  let newCustomerID = numberID.toString().padStart(5, "0");

  return `#KH${newCustomerID}`;
}
// --------------------------------------------------------------------------------- //

// Get customers data from localStorage
function getCustomer() {
  if (
    localStorage.getItem("customers") === null ||
    JSON.parse(localStorage.getItem("customers")).length === 0
  ) {
    localStorage.setItem("customers", JSON.stringify(listCustomer));
  }
  return JSON.parse(localStorage.getItem("customers"));
}
// --------------------------------------------------------------------------------- //

function populateProvinces() {
  const provinceSelect = document.getElementById("province-input");
  provinceSelect.innerHTML = `<option value="">Chọn tỉnh/thành</option>`;
  vietnameseProvinces.forEach((province) => {
    provinceSelect.innerHTML += `<option value="${province.Code}">${province.FullName}</option>`;
  });
}

function populateDistricts(provinceCode) {
  const districtSelect = document.getElementById("district-input");
  const wardSelect = document.getElementById("ward-input");
  districtSelect.innerHTML = `<option value="">Chọn quận/huyện</option>`;
  districtSelect.disabled = !provinceCode;
  districtSelect.required = true;
  wardSelect.innerHTML = `<option value="">Chọn phường/xã</option>`;
  wardSelect.disabled = true;

  const province = vietnameseProvinces.find(
    (province) => province.Code === provinceCode
  );
  province.District.forEach((district) => {
    districtSelect.innerHTML += `<option value="${district.Code}">${district.FullName}</option>`;
  });
}

function populateWards(districtCode) {
  const wardSelect = document.getElementById("ward-input");
  wardSelect.innerHTML = `<option value="">Chọn phường/xã</option>`;
  wardSelect.disabled = !districtCode;
  wardSelect.required = true;

  const provinceCode = document.getElementById("province-input").value;
  const province = vietnameseProvinces.find(
    (province) => province.Code === provinceCode
  );
  const district = province.District.find(
    (district) => district.Code === districtCode
  );
  district.Ward.forEach((ward) => {
    wardSelect.innerHTML += `<option value="${ward.Code}">${ward.FullName}</option>`;
  });

  document.getElementById("address").disabled = false;
  document.getElementById("address").required = true;
}
