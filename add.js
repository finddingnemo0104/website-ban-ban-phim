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

  // Kiểm tra xem phần tử có tồn tại không
  if (cartCountElement) {
      if (cart.length === 0) {
          cartCountElement.style.display = "none"; // Ẩn phần tử nếu giỏ hàng rỗng
      } else {
          const SL = cart.length;
          cartCountElement.innerHTML = SL; // Cập nhật số lượng giỏ hàng
          cartCountElement.style.display = "inline-block"; // Hiển thị phần tử nếu có sản phẩm trong giỏ hàng
      }
  } 
}

  
  document.addEventListener("DOMContentLoaded", updateCartCount);
  function addToCard(id) {
    const product = listPro.find((p) => p.ID === id);
  
    if (product) {
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
    
    // Thêm class 'show' để hiển thị thông báo
    notification.classList.add("show");
  
    // Sau 2 giây, ẩn thông báo bằng cách xóa class 'show'
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000); // 2000ms = 2 giây
  }
  
  