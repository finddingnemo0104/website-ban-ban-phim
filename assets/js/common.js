function isValidLogin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "dangnhap.html";
    return;
  }

  if (!currentUser.status) {
    alert("Tài khoản đã bị khóa !");
    window.location.href = "dangnhap.html";
    localStorage.removeItem("currentUser");
    return;
  }

  const currentURL = window.location.pathname;
  if (
    currentUser.role === "admin" &&
    !(
      currentURL === "/quan-ly-san-pham.html" ||
      currentURL === "/quan-ly-don-hang.html" ||
      currentURL === "/quan-ly-khach-hang.html" ||
      currentURL === "/thong-ke.html"
    )
  ) {
    window.location.href = "quan-ly-san-pham.html";
    return;
  }

  if (
    currentUser.role === "customer" &&
    !(
      currentURL === "/index.html" ||
      currentURL === "/detail.html" ||
      currentURL === "/don-hang.html" ||
      currentURL === "/giohang.html" ||
      currentURL === "/orderSummary.html" ||
      currentURL === "/thongtin.html"
    )
  ) {
    window.location.href = "index.html";
    return;
  }
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "dangnhap.html";
}

function logoutAdmin() {
  localStorage.removeItem("currentUser");
  window.location.href = "login-admin.html";
}

// Show model
function showModel(model) {
  const modelEle = document.getElementsByClassName(model)[0];

  if (modelEle.classList.contains("open")) {
    modelEle.classList.remove("open");
    document.removeEventListener("click", handleOutsideClick);
  } else {
    modelEle.classList.add("open");
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
  }

  function handleOutsideClick(event) {
    if (!modelEle.contains(event.target)) {
      modelEle.classList.remove("open");
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser.role === "admin") {
    showAdminInfoTable();
  } else {
    showCustomerInfoTable();
  }
}

// Show user information table
function showCustomerInfoTable() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const html = `
     <tr>
            <td class="label-info">Khách hàng</td>
            <td class="value-info">${currentUser.name}</td>
          </tr>
          <tr>
            <td class="label-info">Giới tính</td>
            <td class="value-info">${currentUser.gender}</td>
          </tr>
          <tr>
            <td class="label-info">Email</td>
            <td class="value-info">${currentUser.email}</td>
          </tr>
          <tr>
            <td class="label-info">Số điện thoại</td>
            <td class="value-info">${currentUser.phone}</td>
          </tr>
          <tr>
            <td class="label-info">Ngày sinh</td>
            <td class="value-info">${
              new Date(currentUser.dob).toISOString().split("T")[0]
            }</td>
          </tr>
          <tr>
            <td class="label-info">Địa chỉ</td>
            <td class="value-info">${currentUser.address}</td>
          </tr>
    `;

  const userInfoTableEle = document.getElementsByClassName("login-info")[0];
  userInfoTableEle.innerHTML = html;
}

// Show user information table
function showAdminInfoTable() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const html = `
     <tr>
            <td class="label-info">Tên đăng nhập</td>
            <td class="value-info">${currentUser.email}</td>
          </tr>
          <tr>
            <td class="label-info">Mật khẩu</td>
            <td class="value-info">${currentUser.password}</td>
          </tr>
    `;

  const userInfoTableEle = document.getElementsByClassName("login-info")[0];
  userInfoTableEle.innerHTML = html;
}

const currentUser = localStorage.getItem("currentUser");
const currentURL = window.location.pathname;

if (
  !currentUser &&
  (currentURL === "/index.html" || currentURL === "/detail.html")
) {
  document.getElementsByClassName("user")[0].classList.remove("open");
  document.getElementsByClassName("header-search")[0].classList.remove("open");
} else {
  isValidLogin();
}

// const logout =document.getElementById("user-logout")
// logout.onclick=()=>{logOut()}

// const userInfo =document.getElementById("user-info")
// userInfo.onclick=()=>{showModel('login-info')}

// const userInfoContainer =document.getElementById("user-info-container")
// userInfoContainer.onclick=()=>{showModel('model-user-info-container')}
