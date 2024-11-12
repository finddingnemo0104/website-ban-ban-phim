const tableHeader = `
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Hãng</th>
              <th>Đơn giá</th>
              <th>Kho hàng</th>
              <th></th>
            </tr>  
  `;

// Display model add product
const addID = document.getElementById("add-product");

function openAddProductModel(e) {
  document
    .getElementsByClassName("model-add-product-container")[0]
    .classList.add("open");
}

addID.addEventListener("click", openAddProductModel);
// --------------------------------------------------------------------------------- //

// Hide model add product
const closeID = document.getElementById("close-add-product");
const cancelID = document.getElementById("cancel-add-product");
const clickHideModelID = document.getElementById("click-hide-model");

function cancelModel(e) {
  document
    .getElementsByClassName("model-add-product-container")[0]
    .classList.remove("open");
}

closeID.addEventListener("click", cancelModel);
cancelID.addEventListener("click", cancelModel);
clickHideModelID.addEventListener("click", cancelModel);
// --------------------------------------------------------------------------------- //

// Cancel model view product details
const cancelViewDetailsID = document.getElementsByClassName(
  "cancel-view-details"
)[0];

function cancelViewDetails(e) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.remove("open");
}

cancelViewDetailsID.addEventListener("click", cancelViewDetails);
// --------------------------------------------------------------------------------- //

// Display products data from localStorage into table
const table = document.querySelector(".table-product-container table");
const viewDetailsID = document.getElementsByClassName("view-details");

function showProductData(productData) {
  let tableData = ``;

  tableData += tableHeader;
  let products;
  if (productData === null || productData === undefined) {
    products = getProduct();
  } else {
    products = productData;
  }

  for (let item = 0; item < products.length; item++) {
    const product = products[item];
    const html = `
            <tr>
              <td>${product.ID}</td>
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.brand}</td>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <td>
                <div style="display: flex; justify-content: center">
                  <i class="fa-solid fa-eye view-details" data-productid="${product.ID}"></i>
                  <i class="fa-solid fa-trash-can delete-product" data-productid="${product.ID}"></i>
                </div>
              </td>
            </tr>
    `;
    tableData += html;
  }
  table.innerHTML = tableData;

  //  Get ID trash icon
  const deleteProductEles = document.getElementsByClassName("delete-product");

  for (let i = 0; i < deleteProductEles.length; i++) {
    const productID = deleteProductEles[i].dataset.productid;

    deleteProductEles[i].addEventListener("click", (e) => {
      openConfirmDeleteModel(productID);
    });
  }
  // --------------------------------------------------------------------------------- //

  // Get ID eye icon
  for (let i = 0; i < viewDetailsID.length; i++) {
    const productID = viewDetailsID[i].dataset.productid;

    viewDetailsID[i].addEventListener("click", (e) => {
      viewDetails(e, productID);
    });
  }
}
// ---------------------------------------------------------------------------------//

showProductData();

// ---------------------------------------------------------------------------------//

// Display model view product details
function viewDetails(e, productID) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.add("open");
  const products = getProduct();
  const productFound = products.find((product) => product.ID === productID);

  // Display product details
  const htmlProductDetails = `
        <div style="display: flex; margin-bottom: 30px">
        <img
            src="${productFound.image}"
            alt="product-image"
            style="height: auto; width: 50%; margin-right: 20px"
          />
        <div style="margin-left: 20px">
            <h3 style="margin: 0px;">${productFound.ID}</h3>
            <h1 style="color: #21568a">${productFound.name}</h1>
            <h2 style="color: red; margin: 0px">${productFound.price}</h2>
            <div class="product-attribute">
                <h2 class="attribute-header">Số lượng:</h2>
                <p class="attribute-body">${productFound.quantity}</p>
            </div>
            <div class="product-attribute">
                <h2 class="attribute-header">Danh mục:</h2>
                <p class="attribute-body">${productFound.category}</p>
            </div>
            <div class="product-attribute">
                <h2 class="attribute-header"">Hãng:</h2>
                <p class="attribute-body">${productFound.brand}</p>
            </div>
            <button class="button-style" id="edit-product" style="margin-top: 10px">
            <i
              class="fa-solid fa-pen-to-square"
              style="font-size: 13px; padding-top: 1px"
            ></i>
            <div style="padding-left: 10px; font-size: 15px">Sửa sản phẩm</div>
          </button>
        </div>
        </div>
        <h2 style="margin: 20px">Mô tả:</h2>
        <p style="font-size: 22px; margin: 20px 50px">${productFound.description}</p>
`;

  const productDetailsID = document.querySelector(".product-details");

  productDetailsID.innerHTML = htmlProductDetails;

  // Display edit product model
  const editButton = document.getElementById("edit-product");

  function openEditProductModel(productFound) {
    document
      .getElementsByClassName("model-edit-product-container")[0]
      .classList.add("open");
    const listCategory = [
      "Bàn phím cơ",
      "Bàn phím gaming",
      "Bàn phím không dây",
      "Bàn phím đối xứng",
      "Bàn phím mini",
    ];

    const htmlEditProduct = `
    <form onsubmit="editProduct(event, '${
      productFound.ID
    }')" id="edit-product-form">
          <div class="model-body">
            <label for="name" style="width: 15%; margin-left: 20px"
              >Tên sản phẩm</label
            >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value='${productFound.name}'
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
              >Danh mục</label
            >
            <select
              name="category"
              style="
                border-radius: 5px;
                margin-left: 40px;
                padding: 3px;
                width: 20%;
              "
            >
              ${listCategory.map((category) => {
                return `<option value='${category}' ${
                  productFound.category === category && "selected"
                }>${category}</option>`;
              })}
            </select>
          </div>

          <div class="model-body">
            <label for="brand" style="width: 15%; margin-left: 20px"
              >Hãng</label
            >
            <div>
              <input
                type="text"
                name="brand"
                placeholder="Hãng"
                value=${productFound.brand}
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
                onchange="isNotEmpty(event, 'hãng', 'brand-alert-edit')"
              />
              <p id="brand-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="price" style="width: 15%; margin-left: 20px"
              >Đơn giá</label
            >
            <div>
              <input
                type="text"
                name="price"
                placeholder="Đơn giá"
                value=${productFound.price}
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
                onchange="isNotEmpty(event, 'giá', 'price-alert-edit')"
              />
              <p id="price-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="quantity" style="width: 15%; margin-left: 20px"
              >Số lượng</label
            >
            <div>
              <input
                type="text"
                name="quantity"
                placeholder="Số lượng"
                value=${productFound.quantity}
                style="
                  margin-left: 40px;
                  padding: 3px;
                  border-radius: 5px;
                  border: 1px solid #636262;
                  width: 100%;
                "
                onchange="isNotEmpty(event, 'số lượng', 'quantity-alert-edit')"
              />
              <p id="quantity-alert-edit" class="alert"></p>
            </div>
          </div>

          <div class="model-body">
            <label for="description" style="width: 15%; margin-left: 20px"
              >Mô tả sản phẩm</label
            >
            <textarea
              name="description"
              type="text"
              placeholder="Mô tả sản phẩm"
              style="
                margin-left: 40px;
                width: 70%;
                height: 150px;
                padding: 3px;
                border-radius: 5px;
                border: 1px solid #636262;
              "
            >${productFound.description}</textarea>
          </div>

          <div class="model-body">
            <label for="image" style="width: 15%; margin-left: 20px"
              >Hình ảnh</label
            >
            <div>
              <input type="file" name="image" style="margin-left: 40px" onchange="openFile(this,'output-image-edit')"/>
              <p id="image-alert-edit" class="alert"></p>
              <img src='${
                productFound.image
              }' id="output-image-edit" style="height: 100; width: 100px"
              />
            </div>
          </div>

          <!-- Model footer -->
        <div class="model-footer">
          <button type="submit" class="confirm-button">Xác nhận</button>
          <button
            type="button"
            class="cancel-button"
            onclick="cancelEditProductModel()"
          >
            Hủy
          </button>
        </div>
        </form>
    `;
    const editModelBody = document.querySelector("#edit-model-body");
    editModelBody.innerHTML = htmlEditProduct;
  }
  editButton.addEventListener("click", () => {
    openEditProductModel(productFound);
  });
}

// Edit product
function editProduct(event, productID) {
  const listProduct = getProduct();
  indexProduct = listProduct.findIndex((item) => item.ID === productID);
  event.preventDefault();

  const editProductForm = document.querySelector("#edit-product-form");
  const formData = new FormData(editProductForm);
  const name = formData.get("name");
  const category = formData.get("category");
  const brand = formData.get("brand");
  const price = formData.get("price");
  const quantity = formData.get("quantity");
  const description = formData.get("description");
  const image = document.getElementById("output-image-edit").src;
  let isError = false;

  if (name === "") {
    const nameAlertEle = document.getElementById("name-alert-edit");
    nameAlertEle.innerHTML = "Không được để trống tên sản phẩm !";
    isError = true;
  }

  if (brand === "") {
    const brandAlertEle = document.getElementById("brand-alert-edit");
    brandAlertEle.innerHTML = "Không được để trống hãng sản phẩm !";
    isError = true;
  }

  if (price === "") {
    const priceAlertEle = document.getElementById("price-alert-edit");
    priceAlertEle.innerHTML = "Không được để trống giá sản phẩm !";
    isError = true;
  }

  if (quantity === "") {
    const quantityAlertEle = document.getElementById("quantity-alert-edit");
    quantityAlertEle.innerHTML = "Không được để trống số lượng sản phẩm !";
    isError = true;
  }

  if (isError === true) {
    return;
  }

  listProduct[indexProduct].name = name;
  listProduct[indexProduct].category = category;
  listProduct[indexProduct].brand = brand;
  listProduct[indexProduct].price = price;
  listProduct[indexProduct].quantity = quantity;
  listProduct[indexProduct].description = description;
  listProduct[indexProduct].image = image;

  localStorage.setItem("products", JSON.stringify(listProduct));
  alert("Thay đổi thông tin sản phẩm thành công!");
  cancelEditProductModel();
  showProductData();
  viewDetails(event, productID);
}
// --------------------------------------------------------------------------------- //

// Hide edit product model
function cancelEditProductModel() {
  document
    .getElementsByClassName("model-edit-product-container")[0]
    .classList.remove("open");
}
// --------------------------------------------------------------------------------- //

// Preview image
var openFile = function (input, idPreviewElement) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const dataURL = reader.result;
    const output = document.getElementById(idPreviewElement);
    output.src = dataURL;
  };
  reader.readAsDataURL(file);
};

// Add product
// Check data is not empty
function isNotEmpty(e, message, idAlertEle) {
  const alertEle = document.getElementById(idAlertEle);
  if (e.target.value === "") {
    alertEle.innerHTML = `Không được để trống ${message} sản phẩm !`;
    isError = true;
  } else {
    alertEle.innerHTML = ``;
    isError = false;
  }
}

function isValidNumber(number) {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  return regex.test(number) && parseFloat(number) > 0;
}

const addProductForm = document.querySelector(".add-product-container");

function addProduct(event) {
  event.preventDefault();
  var formData = new FormData(addProductForm);
  const name = formData.get("name");
  const category = formData.get("category");
  const brand = formData.get("brand");
  const price = formData.get("price");
  const quantity = formData.get("quantity");
  const description = formData.get("description");
  let image = document.getElementById("output-image").src;

  let isError = false;

  const listProduct = getProduct();
  const nameAlertEle = document.getElementById("name-alert");
  const priceAlertEle = document.getElementById("price-alert");
  const productFound = listProduct.find((product) => product.name === name);
  const quantityAlertEle = document.getElementById("quantity-alert");

  if (name === "") {
    nameAlertEle.innerHTML = "Không được để trống tên sản phẩm !";
    isError = true;
  }

  if (productFound) {
    nameAlertEle.innerHTML = "Sản phẩm này đã có trong cửa hàng !";
    isError = true;
  }

  if (brand === "") {
    const brandAlertEle = document.getElementById("brand-alert");
    brandAlertEle.innerHTML = "Không được để trống hãng sản phẩm !";
    isError = true;
  }

  if (price === "") {
    priceAlertEle.innerHTML = "Không được để trống giá sản phẩm !";
    isError = true;
  }

  if (!isValidNumber(price) && price !== "") {
    priceAlertEle.innerHTML = "Giá sản phẩm không hợp lệ !";
    isError = true;
  }

  if (quantity === "") {
    quantityAlertEle.innerHTML = "Không được để trống số lượng sản phẩm !";
    isError = true;
  }

  if (!isValidNumber(quantity) && quantity !== "") {
    quantityAlertEle.innerHTML = "Số lượng sản phẩm không hợp lệ !";
    isError = true;
  }

  if (isError === true) {
    return;
  }

  const newProduct = new Product(
    genderateProductID(),
    name,
    category,
    brand,
    price,
    quantity,
    description,
    image
  );

  addProductIntoLocalStorage(newProduct);
  showProductData();
  cancelModel();
  alert("Thêm sản phẩm thành công!");

  const listInputEle = addProductForm.querySelectorAll("input");
  listInputEle.forEach((inputEle) => {
    inputEle.value = "";
  });
  addProductForm.querySelector("textarea").value = "";
}
// --------------------------------------------------------------------------------- //

// Get products data from localStorage
function getProduct() {
  if (
    localStorage.getItem("products") === null ||
    JSON.parse(localStorage.getItem("products")).length === 0
  ) {
    localStorage.setItem("products", JSON.stringify(listProduct));
  }
  return JSON.parse(localStorage.getItem("products"));
}
// --------------------------------------------------------------------------------- //

// Add new product into localStorage
function addProductIntoLocalStorage(product) {
  const listProduct = getProduct();
  listProduct.push(product);

  localStorage.setItem("products", JSON.stringify(listProduct));
}

// Delete product
function deleteProduct(productID) {
  const listProduct = getProduct();

  const newListProduct = listProduct.filter(
    (product) => product.ID !== productID
  );

  localStorage.setItem("products", JSON.stringify(newListProduct));
  alert("Xóa sản phẩm thành công!");
  showProductData();
  cancelDeleteProduct();
}

function openConfirmDeleteModel(productID) {
  document
    .getElementsByClassName("model-confirm-delete-container")[0]
    .classList.add("open");
  const confirmDeleteEle = document.getElementById("cofirm-delete-product");

  confirmDeleteEle.addEventListener("click", () => deleteProduct(productID));
}

function cancelDeleteProduct() {
  document
    .getElementsByClassName("model-confirm-delete-container")[0]
    .classList.remove("open");
}

// Genderate product ID
function genderateProductID() {
  const listProduct = getProduct();
  const lastProduct = listProduct[listProduct.length - 1];
  const lastProductID = parseInt(lastProduct.ID.split("#SP")[1]);
  const numberID = lastProductID + 1;
  let newProductID = numberID.toString().padStart(5, "0");

  return `#SP${newProductID}`;
}
// --------------------------------------------------------------------------------- //

// Filter product
function filterProduct(event) {
  event.preventDefault();

  const filterProductForm = document.querySelector(".search-options-style");
  const formData = new FormData(filterProductForm);
  const name = formData.get("name");
  const brand = formData.get("brand");
  const category = formData.get("category");
  const sort = formData.get("sort");

  const listProduct = getProduct();

  let foundProducts = listProduct.filter((product) => {
    let isTrue = true;

    if (name != "") {
      if (product.name === name) {
        isTrue = true;
      } else isTrue = false;
    }
    return isTrue;
  });

  foundProducts = foundProducts.filter((product) => {
    let isTrue = true;

    if (brand != "") {
      if (product.brand === brand) {
        isTrue = true;
      } else isTrue = false;
    }
    return isTrue;
  });

  foundProducts = foundProducts.filter((product) => {
    let isTrue = true;

    if (category != "all") {
      if (product.category === category) {
        isTrue = true;
      } else isTrue = false;
    }
    return isTrue;
  });

  if (sort != "lastest-product") {
    if (sort === "price-decrease") {
      foundProducts.sort(function (a, b) {
        return b.price - a.price;
      });
    } else {
      foundProducts.sort(function (a, b) {
        return a.price - b.price;
      });
    }
  }

  showProductData(foundProducts);
}
// --------------------------------------------

// Show user infomation
function showUserInfo() {
  const showUserInfoEle = document.getElementsByClassName("model-user-info-container")[0];

  if (showUserInfoEle.classList.contains("open")) {
    showUserInfoEle.classList.remove("open");
  } else {
    showUserInfoEle.classList.add("open");
  }
}
// ---------------------------

