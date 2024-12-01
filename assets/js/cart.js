class Product {
  constructor(ID, name, category, brand, price, quantity, description, image) {
    this.ID = ID;
    this.name = name;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.image = image;
  }
}

const listCategory = {
  co: "Bàn phím cơ",
  gaming: "Bàn phím gaming",
  khongday: "Bàn phím không dây",
  doixung: "Bàn phím đối xứng",
  mini: "Bàn phím mini"
};

const listProduct = [];

listProduct.push(
  new Product(
    "#SP00001",
    "Keychron K6",
    listCategory.co,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ 65% với 68 phím, sử dụng switch Gateron (Blue/Brown/Red), hỗ trợ kết nối không dây và có dây. Thiết kế nhỏ gọn, phù hợp cho người làm việc và chơi game.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);

listProduct.push(
  new Product(
    "#SP00002",
    "Corsair K70 RGB MK.2",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00003",
    "Razer BlackWidow V3",
    listCategory.gaming,
    "Razer",
    "2900000",
    50,
    `Bàn phím gaming cơ học với switch Razer Green, mang lại cảm giác gõ clicky, nhanh và chính xác. Có đèn RGB Razer Chroma và thiết kế tối ưu cho game thủ.`,
    "/assets/Image/quan-ly-san-pham/Razer-BlackWidow-V3.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00004",
    "SteelSeries Apex Pro",
    listCategory.gaming,
    "SteelSeries",
    "4800000",
    50,
    `Bàn phím gaming cao cấp với switch OmniPoint điều chỉnh độ nhạy từng phím, đèn RGB từng phím và khung nhôm. Được thiết kế cho trải nghiệm chơi game chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/SteelSeries-Apex-Pro.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00005",
    "Anne Pro 2",
    listCategory.mini,
    "Obinslab",
    "2200000",
    50,
    `Bàn phím 60% không dây với 61 phím, sử dụng switch Gateron hoặc Kailh. Hỗ trợ kết nối Bluetooth, có đèn LED RGB và phần mềm tùy chỉnh keymap. Phù hợp với không gian làm việc nhỏ.`,
    "/assets/Image/quan-ly-san-pham/Anne-Pro-2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00006",
    "Ducky One 2 Mini",
    listCategory.mini,
    "Ducky",
    "2800000",
    50,
    `Bàn phím cơ 60% với 61 phím, sử dụng switch Cherry MX, có đèn LED RGB, thiết kế đơn giản nhưng tinh tế. Lý tưởng cho những người cần sự nhỏ gọn và tính di động cao.`,
    "/assets/Image/quan-ly-san-pham/Ducky-One-2-Mini.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00007",
    "Logitech MX Keys",
    listCategory.khongday,
    "Logitech",
    "2000000",
    50,
    `Bàn phím không dây full-size, sử dụng kết nối Bluetooth hoặc USB receiver. Phím thấp và mượt, phù hợp cho công việc văn phòng và người làm việc từ xa. Hỗ trợ đa thiết bị.`,
    "/assets/Image/quan-ly-san-pham/Logitech-MX-Keys.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00008",
    "Keychron K2 (Version 2)",
    listCategory.khongday,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ không dây với 84 phím, hỗ trợ kết nối Bluetooth và có dây. Tùy chọn switch Gateron và LED RGB. Thích hợp cho công việc và chơi game nhẹ.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00009",
    "Kinesis Freestyle2",
    listCategory.doixung,
    "Kinesis",
    "3500000",
    50,
    `Bàn phím tách rời, có thể điều chỉnh khoảng cách giữa các phím để phù hợp với từng người dùng. Giúp giảm căng thẳng lên vai và cổ tay, thích hợp cho người làm việc văn phòng.`,
    "/assets/Image/quan-ly-san-pham/Kinesis-Freestyle2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00010",
    "ErgoDox EZ",
    listCategory.doixung,
    "ErgoDox",
    "5200000",
    50,
    `Bàn phím cơ học tách rời, có thể điều chỉnh linh hoạt vị trí của hai phần bàn phím để tối ưu hóa tư thế gõ, giúp giảm căng thẳng cho cổ tay và vai. Hỗ trợ tùy biến keymap qua phần mềm, có đèn LED RGB và các tùy chọn switch khác nhau.`,
    "/assets/Image/quan-ly-san-pham/ErgoDox-EZ.jpg"
  )
);

listProduct.push(
  new Product(
    "#SP000011",
    "Corsair K20 RGB MK.3",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);
let user = JSON.parse(localStorage.getItem("currentUser")) || [];
let IdUser = user.ID;
const discountCodes = ["SGU1", "SGU2", "SGU3", "SGU4", "SGU5"];
function saveDiscountCodes(codes) {
  if (typeof(Storage) !== "undefined") {
      localStorage.setItem("discountCodes", JSON.stringify(codes));
  }
}
saveDiscountCodes(discountCodes);
let savedCart = JSON.parse(localStorage.getItem("cart"+IdUser)) || [];

// Hiển thị sản phẩm trong giỏ hàng
savedCart.forEach(product => {
    addProductToCart(product);
});

// Thêm sản phẩm vào giỏ hàng
function addProductToCart(product) {
  const newProductElement = document.createElement("div");
  newProductElement.classList.add("cart-item");
  newProductElement.setAttribute("data-id", product.ID);

  newProductElement.innerHTML = `
      <img src="${product.image}" alt="Product Image" class="item-image">
      <div class="item-details">
          <h2>${product.name}</h2>
          <p>${product.category}</p>
          <p>Đơn giá: ${formatCurrency(product.price)} </p>
      </div>
      <div class="quantity-control">
          <button class="qty-btn" onclick="decreaseQuantity('${product.ID}')">-</button>
          <input type="number" class="SL" step="1" min="1" value="${product.quantity}" 
                 onchange="updateQuantity('${product.ID}', this.value)" />
          <button class="qty-btn" onclick="increaseQuantity('${product.ID}')">+</button>
      </div>
      <p class="item-price" id="price-${product.ID}">${formatCurrency(product.price * product.quantity)} </p>
      <button class="delete-btn" onclick="openDeleteModal('${product.ID}')">
          <i class="fas fa-trash-alt"></i> 
      </button>
  `;

  document.querySelector(".cart-items").appendChild(newProductElement);
}

// Cập nhật số lượng khi người dùng nhập từ bàn phím
function updateQuantity(productID, quantity) {
  const product = savedCart.find(p => p.ID === productID);
  if (product) {
      const products = JSON.parse(localStorage.getItem('products')) || [];

      const stockProduct = products.find(p => p.ID === productID);

      if (stockProduct) {
          const updatedQuantity = Math.max(1, parseInt(quantity));

          // Kiểm tra nếu số lượng nhập vào vượt quá số lượng trong kho
          if (updatedQuantity > stockProduct.quantity) {
              alert("Số lượng nhập vào vượt quá số lượng sản phẩm có sẵn trong kho! Sản phẩm chỉ còn " + stockProduct.quantity);
              
              product.quantity = stockProduct.quantity;

              localStorage.setItem("cart" + IdUser, JSON.stringify(savedCart));

              updateCartDisplay();
              return;
          }

          product.quantity = updatedQuantity;

          localStorage.setItem("cart" + IdUser, JSON.stringify(savedCart));

          updateCartDisplay();
      } else {
          alert("Sản phẩm không tồn tại trong kho!");
      }
  }
}



// Tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productID) {
  const product = savedCart.find(p => p.ID === productID);
  if (product) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const stockProduct = products.find(p => p.ID === productID);
      if (stockProduct) {
          if (product.quantity < stockProduct.quantity) {
              product.quantity += 1;
              localStorage.setItem("cart" + IdUser, JSON.stringify(savedCart));
              updateCartDisplay();
          } else {
              alert("Không đủ số lượng sản phẩm trong kho!");
          }
      } else {
          alert("Sản phẩm không tồn tại trong kho!");
      }
  }
}



// Giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productID) {
  const product = savedCart.find(p => p.ID === productID);
  if (product && product.quantity > 1) {
      product.quantity -= 1;
      localStorage.setItem("cart" + IdUser, JSON.stringify(savedCart));
      updateCartDisplay();
  }
}

// Cập nhật hiển thị giỏ hàng
function updateCartDisplay() {
  document.querySelector(".cart-items").innerHTML = '';
  savedCart.forEach(product => {
      addProductToCart(product);
  });
  checkEmptyCart();
  updateTotal();
}


// Xóa sản phẩm khỏi giỏ hàng
function removeProductFromCart(productID) {
    savedCart = savedCart.filter(product => product.ID !== productID);
    localStorage.setItem("cart"+IdUser, JSON.stringify(savedCart));
    updateCartDisplay();
}

// Kiểm tra giỏ hàng có rỗng không
function checkEmptyCart() {
  const cartContainer = document.querySelector(".cart-container");
  
  // Kiểm tra nếu giỏ hàng trống
  if (savedCart.length === 0) {
    cartContainer.innerHTML = `
    <link rel="stylesheet" href="empty.css">
      <div class="cart-items">
        <!-- Nếu giỏ hàng trống, sẽ hiển thị thông báo -->
        <div class="empty-cart">
          <img src="https://bizweb.dktcdn.net/100/368/179/themes/738982/assets/empty-cart.png?1712982025915" alt="Giỏ hàng trống" class="empty-cart-image">
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
          <button class="continue-shopping-btn" onclick="continueShopping()">Tiếp tục mua sắm</button>
        </div>
      </div>
      <div class="order-summary">
        <!-- Tóm tắt đơn hàng sẽ không hiển thị khi giỏ hàng trống -->
        <p class="summary-title">Tóm tắt đơn hàng</p>
        <div class="summary-detail">
          <p>Giỏ hàng trống. Hãy thêm sản phẩm để tính tổng giá trị.</p>
        </div>
      </div>
    `;
  }
  else updateTotal();
  closeModal();
}

function continueShopping() {
  window.location.href = "index.html";
}
function updateTotal() {
  let Tong = JSON.parse(localStorage.getItem("cart"+IdUser)) || [];
  let count = 0;
  let sum = 0;
  Tong.forEach(product => {
      sum += product.price * product.quantity;
      count += product.quantity;
  });
  // Hàm định dạng giá tiền với dấu phân cách nghìn và thêm 'đ'
  let formattedSum = formatCurrency(sum);
  let sumQuantity ="Tổng cộng " + count + " sản phẩm";
  document.getElementById("sumprice").innerHTML = formattedSum; 
  // Hiển thị số lượng và tổng giá tiền
  document.getElementById("tongcong").innerHTML = sumQuantity;
  document.getElementById("total").innerHTML = formattedSum;
  localStorage.setItem("total", sum);
}
function dis() {
  let discountCodes = JSON.parse(localStorage.getItem("discountCodes")) || []; 
  const disCount = document.getElementById("discount-code").value;

  if (discountCodes.includes(disCount)) {
    document.getElementById("giam_gia").innerHTML = "Giảm giá 10%";
    let sum = JSON.parse(localStorage.getItem("total"));
    let discountPrice = sum * 0.1;
    let giamgia = formatCurrency(discountPrice);
    let sumPrice = formatCurrency(sum - discountPrice);
    document.getElementById("tien_giam_gia").innerHTML = giamgia;
    document.getElementById("total").innerHTML = sumPrice;
    localStorage.setItem("total",sum);
    localStorage.setItem("discnt", 1);
    const updatedCodes = discountCodes.filter(code => code !== disCount);
    localStorage.setItem("discountCodes", JSON.stringify(updatedCodes));
  } else {
    localStorage.setItem("discnt", 0);
    document.getElementById("giam_gia").innerHTML = "Mã giảm giá không hợp lệ hoặc đã được sử";
    document.getElementById("tien_giam_gia").innerHTML = "0";
    document.getElementById("total").innerHTML = formatCurrency(
      JSON.parse(localStorage.getItem("total"))
    );
  }
}
// Hàm định dạng giá tiền với dấu phân cách nghìn
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VNĐ'; 
}
let productToDeleteID = null;

function openDeleteModal(productID) {
    productToDeleteID = productID;
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {  
    document.getElementById("deleteModal").style.display = "none"; 
}
function confirmDelete() {
  if (productToDeleteID) {
      removeProductFromCart(productToDeleteID);
      productToDeleteID = null;
      closeModal(); 
  }
}
checkEmptyCart();


