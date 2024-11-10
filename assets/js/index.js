const products = JSON.parse(localStorage.getItem("products")) || [];
function getProduct() {
  if (
    localStorage.getItem("products") === null ||
    JSON.parse(localStorage.getItem("products")).length === 0
  ) {
    localStorage.setItem("products", JSON.stringify(listProduct));
  }
  return JSON.parse(localStorage.getItem("products"));
}

const viewDetailsID = document.getElementsByClassName("view-details");

for (let i = 0; i < viewDetailsID.length; i++) {
  const productID = viewDetailsID[i].dataset.productid;

  viewDetailsID[i].addEventListener("click", (e) => {
    viewDetails(e, productID);
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const productID = getQueryParam('id');
console.log(productID); // Sử dụng productID để thực hiện các thao tác tiếp theo


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