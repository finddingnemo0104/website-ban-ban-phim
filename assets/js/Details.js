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
  return decodeURIComponent(urlParams.get("id"));
}

function findProductById(productId) {
  return data.find((product) => product.ID === productId);
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
    productPrice.textContent = product.price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    productCategory.textContent = product.category;
    productBrand.textContent = "Hãng: " + product.brand;
    productImage.src = product.image;
    productDetail.textContent = product.description;
  } else {
    console.warn("Product not found.");
  }
}

// Main function to display product based on ID from URL
function displayProduct() {
  const productId = getProductIdFromURL();
  const product = findProductById(productId);
  displayProductDetails(product);
}

// Trigger product display when the document is loaded
document.addEventListener("DOMContentLoaded", displayProduct);
