let inf = JSON.parse(localStorage.getItem("infomation")) || [];
if (inf.length === 0) {
  document.querySelector(".order-summary").innerHTML = `
    <style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
}

/* Header */
.header {
    background-color:  #1e3a8a;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .logo-container img {
    height: 50px;
}

.header .nav a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
}

.header .search-container input {
    padding: 5px;
    border: none;
    border-radius: 4px;
}

/* Giỏ hàng trống */
.container {
    text-align: center;
    padding: 50px;
    margin: 20px auto;
    width: 80%;
}

.empty-cart-img {
    width: 200px;
    height: auto;
    margin-bottom: 20px;
}

h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

.message {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
}

.return-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
}

.return-btn:hover {
    background-color: #0056b3;
}

/* Phần tóm tắt đơn hàng */
.order-summary {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    margin: 20px auto;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Thêm sản phẩm */
.order-items ul {
    list-style-type: none;
    padding: 0;
}

.order-items li {
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.product-image {
    width: 60px;
    height: 60px;
    margin-right: 20px;
}

.product-name {
    font-weight: bold;
    flex-grow: 1;
}

.product-price {
    color: #e74c3c;
    font-weight: bold;
}

/* Tổng tiền */
.order-total {
    text-align: right;
    margin-top: 20px;
}

#totalPrice {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

</style>
    <div class="container">
        <img src="https://etecvn.com/default/template/img/cart-empty.png" style="align-items: center"  alt="Empty Cart" class="empty-cart-img">
        <h1>Giỏ Hàng Của Bạn Đang Trống</h1>
        <p class="message">Bạn chưa có đơn hàng nào. Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
        <a href="index.html" class="return-btn">Quay lại trang chủ</a>
    </div>`;
} else {
  document.getElementById(
    "name"
  ).innerHTML = `<p><strong>Tên khách hàng: </strong> ${inf.hoTen}</p>`;

  document.getElementById(
    "sdt"
  ).innerHTML = `<p><strong>Số điện thoại: </strong> ${inf.SDT}</p>`;

  document.getElementById(
    "adr"
  ).innerHTML = `<p><strong>Địa chỉ giao hàng: </strong> ${inf.address}</p>`;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  }
  document.querySelector(".order-items").innerHTML = `
    <div class="order-items">
        <h3>Sản phẩm đã mua:</h3>
        <ul>
            ${cart
              .map(
                (item) => `
                <li>
                    <img src="${item.image}" alt="${
                  item.name
                }" class="product-image">
                    <span class="product-name">${item.name}</span> - ${
                  item.quantity
                } cái 
                    <span class="product-price"> - ${formatPrice(
                      item.price
                    )}</span>
                </li>
            `
              )
              .join("")}
        </ul>
    </div>
`;

  let price = localStorage.getItem("total");
  document.getElementById(
    "totalPrice"
  ).innerHTML = `<p id="totalPrice"><strong>Tổng tiền:</strong> ${price}</p>`;
}
