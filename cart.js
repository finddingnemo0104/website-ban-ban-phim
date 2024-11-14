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
      "1",
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
      "2",
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
      "3",
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
      "4",
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
      "5",
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
      "6",
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
      "7",
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
      "8",
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
      "9",
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
      "10",
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
      "11",
      "Corsair K20 RGB MK.3",
      listCategory.co,
      "Corsair",
      "3500000",
      50,
      `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
      "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
    )
  );


  
  let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
  savedCart.forEach(product => {
      addProductToCart(product);
  });
  
 
  function addProductToCart(product) {
      const newProductElement = document.createElement("div");
      newProductElement.classList.add("cart-item");
      newProductElement.setAttribute("data-id", product.ID);
  
      newProductElement.innerHTML = `
          <img src="${product.image}" 
               alt="Sản phẩm mới" class="item-image">
          <div class="item-details">
              <h2>${product.name}</h2>
              <p>${product.category}</p>
              <p>Đơn giá: ${product.price}đ</p>
          </div>
          <div class="quantity-control">
              <button class="qty-btn" onclick="decreaseQuantity('${product.ID}')">-</button>
              <div class="cart-quantity">
                  <input type="number" class="SL" step="1" min="1" value="${product.quantity}" readonly>
              </div>
              <button class="qty-btn" onclick="increaseQuantity('${product.ID}')">+</button>
          </div>
          <p class="item-price">${product.price * product.quantity}đ</p>
          <button class="delete-btn" onclick="removeProductFromCart('${product.ID}')">
              <i class="fas fa-trash-alt"></i>
          </button>
      `;
  
      document.querySelector(".cart-items").appendChild(newProductElement);
  }
  
  function increaseQuantity(productID) {
      const product = savedCart.find(p => p.ID === productID);
      if (product) {
          product.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(savedCart));
          updateCartDisplay();
      }
  }
  
  function decreaseQuantity(productID) {
      const product = savedCart.find(p => p.ID === productID);
      if (product && product.quantity > 1) {
          product.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(savedCart));
          updateCartDisplay();
      }
      Sum();
  }
  
  function updateCartDisplay() {
      document.querySelector(".cart-items").innerHTML = '';
      
      savedCart.forEach(product => {
          addProductToCart(product);
      });
  
      checkEmptyCart();
      Sum();
  }
  
  function removeProductFromCart(productID) {
      savedCart = savedCart.filter(product => product.ID !== productID);
      localStorage.setItem("cart", JSON.stringify(savedCart));
      updateCartDisplay();
  }
  
  function checkEmptyCart() {
      const cartItemsContainer = document.querySelector(".cart-items");
      if (savedCart.length === 0) {
          cartItemsContainer.innerHTML = "<p>Giỏ hàng rỗng</p>";
      }
  }
  
  checkEmptyCart();
  
  function Sum() {
    let Tong = JSON.parse(localStorage.getItem("cart")) || [];
    let count=0
    let sum=0;
    Tong.forEach(product => {
        sum+=product.price * product.quantity;
        count+=product.quantity;
    });
    document.getElementById("tongcong").innerHTML="Tổng cộng "+count +" đơn hàng "
    document.getElementById("sumprice").innerHTML=sum;
 }
 Sum();
 
