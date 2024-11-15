// Function to retrieve products from localStorage or initialize it if empty
function getProduct() {
    if (
      localStorage.getItem("products") === null ||
      JSON.parse(localStorage.getItem("products")).length === 0
    ) {
      localStorage.setItem("products", JSON.stringify(listProduct));
    }
    return JSON.parse(localStorage.getItem("products"));
  }
  
  const data = getProduct(); // Retrieve data from local storage
  
  
  function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return decodeURIComponent(urlParams.get("id")) ; 
  }
  
  
  function findProductById(productId) {
    return data.find(product => product.ID === productId); 
  }
  
  
  function displayProductDetails(product) {
    if (product) {
      const productTitle = document.getElementById("product-name");
      const productPrice = document.getElementById("product-price");
      const productCategory = document.getElementById("product-category");
      const productBrand = document.getElementById("product-brand");
      const productImage = document.getElementById("product-image");
      const productDetail = document.getElementById("product-detail");
     
  
      productTitle.textContent = product.name;
      productPrice.textContent =  product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      productCategory.textContent =  product.category;
      productBrand.textContent = "Hãng: " + product.brand;
      productImage.src = product.image;
      productDetail.textContent =  product.description;
    } else {
      console.warn("Product not found.");
      
    }
  }
  
  
  // Main function to display product based on ID from URL
  function displayProduct() {
    const productId = getProductIdFromURL();
    console.log(productId);
    const product = findProductById(productId);
    displayProductDetails(product);  
  }
  
  // Trigger product display when the document is loaded
  document.addEventListener("DOMContentLoaded", displayProduct);

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

// Show user information table
function showUserInfoTable() {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));

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