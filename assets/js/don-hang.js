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

  const orderList = document.querySelector(".order-list");
  const summary = document.querySelector(".summary");

  if (orders.length === 0) {
    orderList.innerHTML = `<p>Không có đơn hàng nào.</p>`;
    summary.innerHTML = `
      <h2>Tổng quan</h2>
      <p>Tổng số đơn hàng: 0</p>
      <p>Tổng chi tiêu: 0đ</p>
      <label for="status-filter">Lọc theo trạng thái:</label>
      <select id="status-filter" onchange="filterOrders(this.value)">
        <option value="all">Chọn trạng thái</option>
        <option value="Đã giao hàng">Đã giao hàng</option>
        <option value="Chờ thanh toán">Chờ thanh toán</option>
        <option value="Chưa xử lý">Chưa xử lý</option>
      </select>
    `;
    return;
  }

  let totalSpent = 0;
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
        <h3>Đơn hàng #000${index + 1}</h3>
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
  summary.innerHTML = `
    <h2>Tổng quan</h2>
    <p>Tổng số đơn hàng: ${orders.length}</p>
    <p>Tổng chi tiêu: ${totalSpent.toLocaleString()}đ</p>
    <label for="status-filter">Lọc theo trạng thái:</label>
    <select id="status-filter" onchange="filterOrders(this.value)">
      <option value="all">Chọn trạng thái</option>
      <option value="Đã giao hàng">Đã giao hàng</option>
      <option value="Chờ thanh toán">Chờ thanh toán</option>
      <option value="Chưa xử lý">Chưa xử lý</option>
    </select>
  `;
}

// Filter orders by status
function filterOrders(status) {
  // Get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.ID) {
    console.error("User is not logged in or missing user ID.");
    return;
  }
  
  const currentCustomerId = currentUser.ID;
  const ordersKey = `orders${currentCustomerId}`;
  const allOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  // Filter orders based on the status
  const filteredOrders = 
    status === "all"
      ? allOrders
      : allOrders.filter((order) => order.orderStatus === status);

  // Update the order list display with the filtered orders
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
        <span class="order-status">${order.orderStatus || "Chưa xử lý"}</span>
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
  const currentCustomerId = JSON.parse(localStorage.getItem("currentUser")).ID;
  const ordersKey = `orders${currentCustomerId}`;
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  console.log(orderIndex);

  if (orders[orderIndex]) {
    // Store selected order details in localStorage for orderSummary.html
    localStorage.setItem("selectedOrder", JSON.stringify(orders[orderIndex]));
    localStorage.setItem('orderIndex', ''+(orderIndex+1));
    window.location.href = `orderSummary.html?orderIndex=${orderIndex}`;
  } else {
    alert("Đơn hàng không tồn tại.");
  }
}