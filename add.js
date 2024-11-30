let User = JSON.parse(localStorage.getItem("currentUser")) || [];
let IDUser = User.ID;
let cart = JSON.parse(localStorage.getItem("cart"+IDUser)) || []; 
let listPro = JSON.parse(localStorage.getItem("products")) || [];
let proID;

const getData = async () => {
  const path = new URLSearchParams(window.location.search);
  proID = path.get("id");
  if (!proID) {
    return;
  }
  const addToCartButton = document.querySelector(".add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", findAndAddToCart);}
};

const findAndAddToCart = () => {
  const product = listPro.find((p) => p.ID === proID);

  if (product) {
    // Kiểm tra nếu sản phẩm hết hàng
    if (product.quantity === 0) {
      showOutOfStockNotification();  
      return;  
    }
    const cartItem = cart.find((item) => item.ID === proID);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart"+IDUser, JSON.stringify(cart));
    showNotification();
    updateCartCount();
  } 
};
getData();
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"+IDUser)) || [];
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    if (cart.length === 0) {
      cartCountElement.style.display = "none";
    } else {
      const SL = cart.length;
      cartCountElement.innerHTML = SL;
      cartCountElement.style.display = "inline-block";
    }
  }
}
document.addEventListener("DOMContentLoaded", updateCartCount);
function addToCard(id) {
  const product = listPro.find((p) => p.ID === id);

  if (product) {
    // Kiểm tra nếu sản phẩm hết hàng
    if (product.quantity === 0) {
      showOutOfStockNotification();  // Hiển thị thông báo sản phẩm hết hàng
      return;
    }
    const cartItem = cart.find((item) => item.ID === id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart" + IDUser, JSON.stringify(cart));
    showNotification();
    updateCartCount();
  } else {
    console.error(`Product with ID ${id} not found.`);
  }
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function showOutOfStockNotification() {
  const outOfStockNotification = document.getElementById("out-of-stock-notification");
  
  if (outOfStockNotification) {
    outOfStockNotification.classList.add("show");
  
    setTimeout(() => {
      outOfStockNotification.classList.remove("show");
    }, 2000);
  }
}