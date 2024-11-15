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

  showUserInfoTable();
}
// ---------------------------

// Show user information table
function showUserInfoTable() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const html = `
    <tr>
            <td class="label-info">Tên đăng nhập</td>
            <td class="value-info">${currentUser.phone}</td>
          </tr>
          <tr>
            <td class="label-info">Mật khẩu</td>
            <td class="value-info">${currentUser.password}</td>
          </tr>
    `;

  const userInfoTableEle = document.getElementsByClassName("login-info")[0];
  userInfoTableEle.innerHTML = html;
}
