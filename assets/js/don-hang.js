document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || !currentUser.ID) {
    alert("Vui lòng đăng nhập trước khi truy cập trang này.");
    window.location.href = "dangnhap.html";
    return;
  }

  const currentCustomerId = currentUser.ID;

  const ordersKey = `orders${currentCustomerId}`;
  displayOrders(ordersKey);
});

// Function to display orders dynamically
function displayOrders(ordersKey) {
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  if (orders.length === 0) {
    document.querySelector(".order-list").innerHTML = `<p>Không có đơn hàng nào.</p>`;
    return;
  }

  let totalSpent = 0;
  const orderList = document.querySelector(".order-list");
  orderList.innerHTML = ""; // Clear existing orders

  orders.forEach((order, index) => {
    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalSpent += orderTotal;

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
      <div class="order-header">
        <h3>Đơn hàng #${index + 1}</h3>
        <span class="order-status">${order.status || "Chưa xử lý"}</span>
      </div>
      <div class="order-details">
        <p>Ngày đặt: ${order.orderDate}</p>
        <p>Địa chỉ: ${order.customerInfo.address}</p>
        ${order.items
          .map(
            (item) => `
          <p>${item.name} - Số lượng: ${item.quantity} - ${parseInt(item.price).toLocaleString()}đ</p>
        `
          )
          .join("")}
        <p class="total-price">Tổng cộng: ${orderTotal.toLocaleString()}đ</p>
        <button class="details-btn" onclick="viewOrderDetails(${index})">Xem chi tiết</button>
      </div>
    `;
    orderList.appendChild(orderItem);
  });

  // Update total summary in the aside
  document.querySelector(".summary").innerHTML = `
    <h2>Tổng quan</h2>
    <p>Tổng số đơn hàng: ${orders.length}</p>
    <p>Tổng chi tiêu: ${totalSpent.toLocaleString()}đ</p>
    <label for="status-filter">Lọc theo trạng thái:</label>
    <select id="status-filter" onchange="filterOrders(this.value)">
      <option value="all">Chọn trạng thái</option>
      <option value="Đã giao hàng">Đã giao hàng</option>
      <option value="Chờ thanh toán">Chờ thanh toán</option>
    </select>
  `;
}

// Filter orders by status
function filterOrders(status) {
  const currentCustomerId = "12345"; // Replace with dynamic customer ID
  const ordersKey = `orders#${currentCustomerId}`;
  const allOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  const filteredOrders =
    status === "all"
      ? allOrders
      : allOrders.filter((order) => order.status === status);

  // Update order list with filtered orders
  displayOrdersList(filteredOrders);
}

function displayOrdersList(orders) {
  const orderList = document.querySelector(".order-list");
  orderList.innerHTML = ""; // Clear existing orders

  if (orders.length === 0) {
    orderList.innerHTML = `<p>Không có đơn hàng nào với trạng thái này.</p>`;
    return;
  }

  orders.forEach((order, index) => {
    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
      <div class="order-header">
        <h3>Đơn hàng #${index + 1}</h3>
        <span class="order-status">${order.status || "Chưa xử lý"}</span>
      </div>
      <div class="order-details">
        <p>Ngày đặt: ${order.orderDate}</p>
        <p>Địa chỉ: ${order.customerInfo.address}</p>
        ${order.items
          .map(
            (item) => `
          <p>${item.name} - Số lượng: ${item.quantity} - ${parseInt(item.price).toLocaleString()}đ</p>
        `
          )
          .join("")}
        <p class="total-price">Tổng cộng: ${orderTotal.toLocaleString()}đ</p>
        <button class="details-btn" onclick="viewOrderDetails(${index})">Xem chi tiết</button>
      </div>
    `;
    orderList.appendChild(orderItem);
  });
}

// Placeholder for view details functionality
function viewOrderDetails(orderIndex) {
  alert(`Chi tiết đơn hàng #${orderIndex + 1}`);
}