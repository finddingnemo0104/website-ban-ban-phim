const tableHeader = `
            <tr>
              <th>Mã khách hàng</th>
              <th>Tên khách hàng</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Hoạt động</th>
              <th></th>
            </tr>  
  `;

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

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 ở phía trước nếu cần
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (0-11), cần cộng thêm 1
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về chuỗi theo định dạng dd/mm/yyyy
}

// Display customers data from localStorage into table
const table = document.querySelector(".table-customer-container table");
const viewDetailsID = document.getElementsByClassName("view-details");

function showCustomerData(customerData) {
  let tableData = ``;

  tableData += tableHeader;
  let customers;
  if (customerData === null || customerData === undefined) {
    customers = getCustomer();
  } else {
    customers = customerData;
  }

  for (let item = 0; item < customers.length; item++) {
    const customer = customers[item];
    if (customer.role === listRole.admin) { continue};
    const html = `
            <tr>
              <td>${customer.ID}</td>
              <td>${customer.name}</td>
              <td>${customer.gender}</td>
              <td>${customer.email}</td>
              <td>${customer.phone}</td>
              <td>${formatDate(new Date(customer.dob))}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" ${
                    customer.status ? "checked" : ""
                  } onchange="changeCustomerStatus(this,'${customer.ID}')">
                  <span class="slider round" ></span>
                </label>
              </td>
              <td>
                <div style="display: flex; justify-content: center">
                  <i class="fa-solid fa-eye view-details" data-customerid="${
                    customer.ID
                  }"></i>
                </div>
              </td>
            </tr>
    `;
    tableData += html;
  }
  table.innerHTML = tableData;

  // Get ID eye icon
  for (let i = 0; i < viewDetailsID.length; i++) {
    const customerID = viewDetailsID[i].dataset.customerid;

    viewDetailsID[i].addEventListener("click", (e) => {
      viewDetails(e, customerID);
    });
  }
}
// --------------------------------------------------------------------------------- //
showCustomerData();

// Display model add product
function openAddProductModel(e) {
  document
    .getElementsByClassName("model-add-product-container")[0]
    .classList.add("open");
}
// --------------------------------------------------------------------------------- //

// Hide model add customer
function cancelAddCustomerModel(e) {
  document
    .getElementsByClassName("model-add-product-container")[0]
    .classList.remove("open");
}
// --------------------------------------------------------------------------------- //

//  Add customer
// Check data is not empty
function isNotEmpty(e, message, idAlertEle, type) {
  const alertEle = document.getElementById(idAlertEle);
  if (e.target.value === "") {
    if (type && type === "email") {
      alertEle.innerHTML = ``;
      return;
    }
    alertEle.innerHTML = `Không được để trống ${message} khách hàng !`;
    isError = true;
  } else {
    alertEle.innerHTML = ``;
    isError = false;
  }
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

const addCustomerForm = document.querySelector(".add-product-container");

function addCustomer(event) {
  event.preventDefault();
  var formData = new FormData(addCustomerForm);
  const name = formData.get("name");
  const gender = formData.get("gender");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const dob = new Date(formData.get("dob"));
  const address = formData.get("address");
  let isError = false;

  const listCustomer = getCustomer();
  const phoneAlertEle = document.getElementById("phone-alert");
  const emailAlertEle = document.getElementById("email-alert");
  const nameAlertEle = document.getElementById("name-alert");

  const customerFoundPhone = listCustomer.find(
    (customer) => customer.phone === phone
  );

  const customerFoundEmail = listCustomer.find(
    (customer) => customer.email === email
  );

  // Check phone number
  if (phone === "") {
    phoneAlertEle.innerHTML = "Không được để trống số điện thoại khách hàng !";
    isError = true;
  }

  if (customerFoundPhone) {
    phoneAlertEle.innerHTML = "Số điện thoại này đã tồn tại !";
    isError = true;
  }

  if (!isValidPhoneNumber(phone) && phone !== "") {
    phoneAlertEle.innerHTML = "Số điện thoại không hợp lệ !";
    isError = true;
  }
  // --------------------------------------------------------------------------------- //

  // Check name
  if (name === "") {
    nameAlertEle.innerHTML = "Không được để trống tên khách hàng !";
    isError = true;
  }

  if (!isValidName(name) && name !== "") {
    nameAlertEle.innerHTML = "Tên khách hàng không hợp lệ !";
    isError = true;
  }
  // --------------------------------------------------------------------------------- //

  // Check email
  if (customerFoundEmail && email !== "") {
    emailAlertEle.innerHTML = "Email này đã tồn tại !";
    isError = true;
  }

  if (!isValidEmail(email) && email !== "") {
    emailAlertEle.innerHTML = "Email không hợp lệ !";
    isError = true;
  }
  // --------------------------------------------------------------------------------- //

  if (isError === true) {
    return;
  }

  const newCustomer = new Customer(
    gennerateCustomerID(),
    name,
    gender,
    email,
    phone,
    dob,
    address,
    true,
    "",
    "customer"
  );

  addCustomerIntoLocalStorage(newCustomer);
  cancelAddCustomerModel();
  showCustomerData();
  alert("Thêm khách hàng thành công!");

  const listInputEle = addCustomerForm.querySelectorAll("input");
  listInputEle.forEach((inputEle) => {
    inputEle.value = "";
    if (inputEle.type === "date") {
      inputEle.value = "2024-01-01";
    }
  });
  addCustomerForm.querySelector("textarea").value = "";
}
// --------------------------------------------------------------------------------- //

// Add new customer into localStorage
function addCustomerIntoLocalStorage(customer) {
  const listCustomer = getCustomer();
  listCustomer.push(customer);

  localStorage.setItem("customers", JSON.stringify(listCustomer));
}
// --------------------------------------------------------------------------------- //

// Display model view customer details
function viewDetails(e, customerID) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.add("open");
  const customers = getCustomer();
  const customerFound = customers.find(
    (customer) => customer.ID === customerID
  );
  const formattedDate = new Date(customerFound.dob).toLocaleDateString("en-GB");
  let avatarURL =
    customerFound.gender === "Nam"
      ? "./assets/Image/quan-ly-khach-hang/male-customer.png"
      : customerFound.gender === "Nữ"
      ? "./assets/Image/quan-ly-khach-hang/female-customer.jpg"
      : "./assets/Image/quan-ly-khach-hang/other-customer.jpg";

  // Display customer details
  const htmlCustomerDetails = `
        <div style="display: flex; margin-bottom: 30px">
          <img
            src="${avatarURL}"
            alt="customer-image"
            style="height: 80%; width: 30%; margin-right: 20px"
          />
          <div style="margin-left: 20px">
            <h3 style="margin: 0px">${customerFound.ID}</h3>
            <h1 style="color: #21568a">${customerFound.name}</h1>
            <div class="product-attribute">
              <h2 class="attribute-header">Giới tính:</h2>
              <p class="attribute-body">${customerFound.gender}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Email:</h2>
              <p class="attribute-body">${customerFound.email}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Số điện thoại:</h2>
              <p class="attribute-body">${customerFound.phone}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Ngày sinh:</h2>
              <p class="attribute-body">${formattedDate}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Địa chỉ:</h2>
              <p class="attribute-body">${customerFound.address}</p>
            </div>
            <button
              class="button-style"
              id="edit-customer"
              style="margin-top: 10px;"
            >
              <i
                class="fa-solid fa-pen-to-square"
                style="font-size: 17px; padding-top: 1px"
              ></i>
              <div style="padding-left: 10px; font-size: 17px">
                Cập nhật thông tin khách hàng
              </div>
            </button>
          </div>
        </div>
`;

  const customerDetailsID = document.querySelector(".product-details");

  customerDetailsID.innerHTML = htmlCustomerDetails;

  // --------------------------------------------------------------------------------- //

  // Display edit customer model
  const editButton = document.getElementById("edit-customer");

  function openEditCustomertModel(customerFound) {
    document
      .getElementsByClassName("model-edit-product-container")[0]
      .classList.add("open");
    const listGender = ["Nam", "Nữ", "Khác"];

    const dobValue = new Date(customerFound.dob).toISOString().split("T")[0];

    const htmlEditCustomer = `
    <form onsubmit="editCustomer(event, '${
      customerFound.ID
    }')" id="edit-customer-form">
          <div class="model-body">
            <label for="name" style="width: 15%; margin-left: 20px"
              >Tên khách hàng</label
            >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tên khách hàng"
                value='${customerFound.name}'
                style="
                  margin-left: 40px;
                  width: 60%;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
                onchange="isNotEmpty(event, 'tên', 'name-alert-edit')"
              />
              <p id="name-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="category" style="width: 15%; margin-left: 20px; margin-bottom: 20px"
              >Giới tính</label
            >
            <select
              name="gender"
              style="
                border-radius: 5px;
                margin-left: 40px;
                padding: 3px;
                width: 20%;
              "
            >
              ${listGender.map((gender) => {
                return `<option value='${gender}' ${
                  customerFound.gender === gender && "selected"
                }>${gender}</option>`;
              })}
            </select>
          </div>

          <div class="model-body">
            <label for="email" style="width: 15%; margin-left: 20px"
              >Email</label
            >
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value="${customerFound.email}"
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
              />
              <p id="email-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="phone" style="width: 15%; margin-left: 20px"
              >Số điện thoại</label
            >
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value=${customerFound.phone}
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
                onchange="isNotEmpty(event, 'phone', 'phone-alert-edit')"
              />
              <p id="phone-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="dob" style="width: 15%; margin-left: 20px"
              >Ngày sinh</label
            >
            <div>
              <input
                type="date"
                name="dob"
                value=${dobValue}
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 210px;
                "
              />
            </div>
          </div>

          <div class="model-body">
            <label for="address" style="width: 15%; margin-left: 20px"
              >Địa chỉ</label
            >
            <div>
              <textarea
              name="address"
              type="text"
              placeholder="Địa chỉ"
              style="
                margin-left: 40px;
                width: 500px;
                height: 50px;
                padding: 3px;
                border-radius: 5px;
                border: 1px solid #636262;
              "
            >${customerFound.address}</textarea>
            </div>
          </div>

          <!-- Model footer -->
        <div class="model-footer">
          <button type="submit" class="confirm-button">Xác nhận</button>
          <button
            type="button"
            class="cancel-button"
            onclick="cancelEditCustomerModel()"
          >
            Hủy
          </button>
        </div>
        </form>
    `;
    const editModelBody = document.querySelector("#edit-model-body");
    editModelBody.innerHTML = htmlEditCustomer;
  }
  editButton.addEventListener("click", () => {
    openEditCustomertModel(customerFound);
  });
}

function cancelViewDetails(e) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.remove("open");
}

// --------------------------------------------------------------------------------- //

// Hide edit product model
function cancelEditCustomerModel() {
  document
    .getElementsByClassName("model-edit-product-container")[0]
    .classList.remove("open");
}
// --------------------------------------------------------------------------------- //

// Edit product
function editCustomer(event, customerID) {
  const listCustomer = getCustomer();
  indexCustomer = listCustomer.findIndex((item) => item.ID === customerID);
  event.preventDefault();

  const editProductForm = document.querySelector("#edit-customer-form");
  const formData = new FormData(editProductForm);
  const name = formData.get("name");
  const gender = formData.get("gender");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const dob = new Date(formData.get("dob"));
  const address = formData.get("address");
  let isError = false;

  const phoneAlertEle = document.getElementById("phone-alert-edit");
  const emailAlertEle = document.getElementById("email-alert-edit");

  const customerFoundPhone = listCustomer.find(
    (customer) => customer.phone === phone && customer.ID !== customerID
  );

  const customerFoundEmail = listCustomer.find(
    (customer) => customer.email === email && customer.ID !== customerID
  );

// --------------------------------------------------------------------------------- //

  // Check phone number
  if (phone === "") {
    phoneAlertEle.innerHTML = "Không được để trống số điện thoại khách hàng !";
    isError = true;
  }

  if (customerFoundPhone) {
    phoneAlertEle.innerHTML = "Số điện thoại này đã tồn tại !";
    isError = true;
  }

  if (!isValidPhoneNumber(phone)) {
    phoneAlertEle.innerHTML = "Số điện thoại không hợp lệ !";
    isError = true;
  }

  // --------------------------------------------------------------------------------- //

  //Check name
  if (name === "") {
    const nameAlertEle = document.getElementById("name-alert-edit");
    nameAlertEle.innerHTML = "Không được để trống tên khách hàng !";
    isError = true;
  }

  // --------------------------------------------------------------------------------- //

  // Check email
  if (customerFoundEmail) {
    emailAlertEle.innerHTML = "Email này đã tồn tại !";
    isError = true;
  }

  if (email!== "" && !isValidEmail(email)) {
    emailAlertEle.innerHTML = "Email không hợp lệ !";
    isError = true;
  }

  // --------------------------------------------------------------------------------- //

  if (isError === true) {
    return;
  }

  listCustomer[indexCustomer].name = name;
  listCustomer[indexCustomer].gender = gender;
  listCustomer[indexCustomer].email = email;
  listCustomer[indexCustomer].phone = phone;
  listCustomer[indexCustomer].dob = dob;
  listCustomer[indexCustomer].address = address;

  localStorage.setItem("customers", JSON.stringify(listCustomer));
  alert("Cập nhật thông tin khách hàng thành công!");
  cancelEditCustomerModel();
  showCustomerData();
  viewDetails(event, customerID);
}

// --------------------------------------------------------------------------------- //--

// Change customer activity status
function changeCustomerStatus(input, customerID) {
  const listCustomer = getCustomer();
  indexCustomer = listCustomer.findIndex((item) => item.ID === customerID);

  if (input.checked) {
    listCustomer[indexCustomer].status = true;
    alert(`Đã mở tài khoản của khách hàng ${customerID}`);
  } else {
    listCustomer[indexCustomer].status = false;
    alert(`Đã khóa tài khoản của khách hàng ${customerID}`);
  }

  localStorage.setItem("customers", JSON.stringify(listCustomer));
}
// --------------------------------------------------------------------------------- //

// Filter customer
function filterCustomer(event) {
  event.preventDefault();

  const searchCustomerByNameForm = document.querySelector(
    ".search-options-style"
  );
  const formData = new FormData(searchCustomerByNameForm);
  const name = formData.get("name");
  const gender = formData.get("gender");

  const listCustomer = getCustomer();

  let foundCustomers = listCustomer.filter((customer) => {
    let isTrue = true;

    if (name !== "") {
      if (customer.name === name) {
        isTrue = true;
      } else isTrue = false;
    }
    return isTrue;
  });

  foundCustomers = foundCustomers.filter((customer) => {
    let isTrue = true;

    if (gender !== "all") {
      if (customer.gender === gender) {
        isTrue = true;
      } else isTrue = false;
    }
    return isTrue;
  });

  showCustomerData(foundCustomers);
}
