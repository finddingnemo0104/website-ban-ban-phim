// if (!localStorage.getItem("orders")) {
//   const orders = [
//     {
//       id: 1,
//       customer: "Nguyễn Văn A",
//       customerPhone: "0765184992",
//       date: "2024-11-01",
//       address: "279A An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh",
//       status: "chưa xử lý",
//       products: [
//         {
//           name: "Logitech G Pro X Mechanical Gaming Keyboard",
//           quantity: 1,
//           price: 2000000,
//         },
//         {
//           name: "Logitech G Pro X Mechanical Gaming Keyboard",
//           quantity: 2,
//           price: 2000000,
//         },
//       ],
//       history: [
//         { status: "chưa xử lý", date: "2024-11-01" },
//         { status: "đã xác nhận", date: "2024-11-02" },
//       ],
//     },
//     {
//       id: 2,
//       customer: "Minh Thư",
//       customerPhone: "0364748018",
//       date: "2024-11-01",
//       address: "279A An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh",
//       status: "chưa xử lý",
//       products: [
//         { name: "Laptop", quantity: 1, price: 2000000 },
//         { name: "Laptop", quantity: 2, price: 2000000 },
//       ],
//       history: [
//         { status: "chưa xử lý", date: "2024-11-01" },
//         { status: "đã xác nhận", date: "2024-11-02" },
//       ],
//     },
//   ];

//   // Lưu dữ liệu mẫu vào `localStorage` nếu chưa có
//   localStorage.setItem("orders", JSON.stringify(orders));
// }

// Lấy thông tin email của admin từ localStorage và hiển thị
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.role === "admin") {
    // document.getElementById(
    //   "admin-email"
    // ).innerText = `Email: ${currentUser.email}`;
  } else {
    // Nếu không phải admin, điều hướng về trang đăng nhập
    window.location.href = "dangnhap.html";
  }
  displayOrders();
});

function displayOrders() {
  const orders = getOrdersFromLocalStorage();
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Clear existing rows

  orders.forEach((order) => {
    const total = order.products.reduce((sum, product) => sum + product.quantity * product.price, 0);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${total.toLocaleString()}đ</td>
      <td>
        <select class="status-dropdown" onchange="updateStatus(${order.id}, this.value)">
          <option value="chưa xử lý" ${order.status === "chưa xử lý" ? "selected" : ""}>Chưa xử lý</option>
          <option value="đã xác nhận" ${order.status === "đã xác nhận" ? "selected" : ""}>Đã xác nhận</option>
          <option value="đã giao thành công" ${order.status === "đã giao thành công" ? "selected" : ""}>Đã giao thành công</option>
          <option value="đã hủy" ${order.status === "đã hủy" ? "selected" : ""}>Đã hủy</option>
        </select>
      </td>
      <td class="action-icons">
        <i class="fa-solid fa-eye" onclick="viewOrderDetails(${order.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteOrder(${order.id})"></i>
      </td>
    `;
    orderList.appendChild(row);
  });
}

// Hiển thị form thêm đơn hàng
function showAddOrderForm() {
  document.getElementById("order-management").style.display = "none";
  document.getElementById("add-order").style.display = "block";
}

// Hủy thêm đơn hàng
function cancelAddOrder() {
  document.getElementById("add-order").style.display = "none";
  document.getElementById("order-management").style.display = "block";
}

// Thêm sản phẩm vào form thêm đơn hàng
function addProductField() {
  const productField = document.createElement("div");
  productField.innerHTML = `
  <input type="text" placeholder="Tên sản phẩm" required>
  <input type="number" placeholder="Số lượng" required>
  <input type="number" placeholder="Giá" required>
`;
  document.getElementById("add-products-list").appendChild(productField);
}

// Lưu đơn hàng mới
document
  .getElementById("add-order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName =
      document.getElementById("add-customer-name").value;
    const orderDate = document.getElementById("add-order-date").value;
    const address = document.getElementById("add-order-address").value;

    const productFields = document.querySelectorAll(
      "#add-products-list > div"
    );
    const products = Array.from(productFields).map((field) => {
      const inputs = field.querySelectorAll("input");
      return {
        name: inputs[0].value,
        quantity: parseInt(inputs[1].value),
        price: parseInt(inputs[2].value),
      };
    });

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      customer: customerName,
      date: orderDate,
      address: address,
      status: "chưa xử lý",
      products: products,
      history: [{ status: "chưa xử lý", date: orderDate }],
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders();
    cancelAddOrder();
  });

// Hiển thị form sửa đơn hàng
function showEditOrderForm(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.id === orderId);

  if (order) {
    document.getElementById("edit-order-id").value = order.id;
    document.getElementById("edit-customer-name").value = order.customer;
    document.getElementById("edit-order-date").value = order.date;
    document.getElementById("edit-order-address").value = order.address;

    const productList = document.getElementById("edit-products-list");
    productList.innerHTML = "";
    order.products.forEach((product) => {
      const productField = document.createElement("div");
      productField.innerHTML = `
          <input type="text" value="${product.name}" required>
          <input type="number" value="${product.quantity}" required>
          <input type="number" value="${product.price}" required>
      `;
      productList.appendChild(productField);
    });

    document.getElementById("order-management").style.display = "none";
    document.getElementById("edit-order").style.display = "block";
  }
}

// Hủy sửa đơn hàng
function cancelEditOrder() {
  document.getElementById("edit-order").style.display = "none";
  document.getElementById("order-management").style.display = "block";
}

// Lưu thay đổi đơn hàng
document
  .getElementById("edit-order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const orderId = parseInt(
      document.getElementById("edit-order-id").value
    );
    const customerName =
      document.getElementById("edit-customer-name").value;
    const orderDate = document.getElementById("edit-order-date").value;
    const address = document.getElementById("edit-order-address").value;

    const productFields = document.querySelectorAll(
      "#edit-products-list > div"
    );
    const products = Array.from(productFields).map((field) => {
      const inputs = field.querySelectorAll("input");
      return {
        name: inputs[0].value,
        quantity: parseInt(inputs[1].value),
        price: parseInt(inputs[2].value),
      };
    });

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        customer: customerName,
        date: orderDate,
        address: address,
        products: products,
      };
      localStorage.setItem("orders", JSON.stringify(orders));
      displayOrders();
      cancelEditOrder();
    }
  });

// Thêm sản phẩm vào form sửa đơn hàng
function addEditProductField() {
  const productField = document.createElement("div");
  productField.innerHTML = `
  <input type="text" placeholder="Tên sản phẩm" required>
  <input type="number" placeholder="Số lượng" required>
  <input type="number" placeholder="Giá" required>
`;
  document.getElementById("edit-products-list").appendChild(productField);
}

// Hàm để xem chi tiết đơn hàng
function viewOrderDetails(orderId) {
  const orders = getOrdersFromLocalStorage();
  const order = orders.find((o) => o.id === parseInt(orderId));

  if (order) {
    // Populate the details section
    document.getElementById("customer-name").innerText = `Tên khách hàng: ${order.customer}`;
    document.getElementById("order-id").innerText = `Mã đơn hàng: #${order.id}`;
    document.getElementById("order-date").innerText = `Ngày đặt hàng: ${order.date}`;
    document.getElementById("order-address").innerText = `Địa chỉ: ${order.address}`;

    const productList = document.getElementById("order-products-list");
    productList.innerHTML = ""; // Clear existing products
    order.products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price.toLocaleString()}đ</td>
      `;
      productList.appendChild(row);
    });

    const total = order.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    document.getElementById("order-total").innerText = `Tổng cộng: ${total.toLocaleString()}đ`;

    const historyList = document.getElementById("order-history");
    historyList.innerHTML = ""; 
    order.history.forEach((entry) => {
      const listItem = document.createElement("li");
      listItem.innerText = `Trạng thái: ${entry.status} - Ngày: ${entry.date}`;
      historyList.appendChild(listItem);
    });

    // Show the details section and hide the orders list
    document.getElementById("order-management").style.display = "none";
    document.getElementById("order-details").style.display = "block";
  } else {
    alert("Không tìm thấy thông tin đơn hàng!");
  }
}

// Function để cập nhật trạng thái đơn hàng và lưu lịch sử
function updateStatus(orderId, newStatus) {
  const orders = getOrdersFromLocalStorage();
  const order = orders.find((o) => o.id === orderId);

  if (order) {
    order.status = newStatus;
    order.history.push({
      status: newStatus,
      date: new Date().toISOString().split("T")[0],
    });
    saveOrdersToLocalStorage(orders);
    displayOrders();
    alert(
      `Trạng thái đơn hàng ${orderId} đã được cập nhật thành: ${newStatus}`
    );
  } else {
    alert(`Không tìm thấy đơn hàng #${orderId}!`);
  }
}

// Function để xóa đơn hàng
function deleteOrder(orderId) {
  let orders = getOrdersFromLocalStorage();
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${orderId}?`);
    if (confirmDelete) {
      orders.splice(orderIndex, 1);
      saveOrdersToLocalStorage(orders);
      displayOrders();
      alert(`Đơn hàng #${orderId} đã được xóa thành công.`);
    }
  } else {
    alert(`Không tìm thấy đơn hàng #${orderId}!`);
  }
}

// Đóng chi tiết đơn hàng và quay lại danh sách đơn hàng
function closeOrderDetails() {
  document.getElementById("order-details").style.display = "none";
  document.getElementById("order-management").style.display = "block";
}

function saveOrdersToLocalStorage(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrdersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

// Bao's part
// Hàm lọc đơn hàng theo tên khách hàng, tình trạng, và ngày tháng
function filterOrders(event) {
  event.preventDefault();

  const customerName = event.target.customer.value.trim().toLowerCase();
  const status = event.target.status.value; // Lấy giá trị tình trạng đơn hàng từ dropdown
  const startDate = event.target["start-date"].value;
  const endDate = event.target["end-date"].value;

  let filteredOrders = getOrdersFromLocalStorage(); // Lấy tất cả các đơn hàng từ localStorage

  // Lọc theo tên khách hàng
  if (customerName) {
    filteredOrders = filteredOrders.filter((order) =>
      order.customer.toLowerCase().includes(customerName)
    );
  }

  // Lọc theo tình trạng đơn hàng
  if (status && status !== "all") {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  // Lọc theo khoảng thời gian
  if (startDate && endDate) {
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
  }

  // Hiển thị các đơn hàng đã lọc
  displayOrders(filteredOrders);
}

// Hàm hiển thị danh sách đơn hàng (có thể dùng lại cho cả lọc và làm mới)
function displayOrders(orders = getOrdersFromLocalStorage()) {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Clear existing rows

  orders.forEach((order) => {
    const total = order.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${total.toLocaleString()}đ</td>
      <td>
        <select class="status-dropdown" onchange="updateStatus(${
          order.id
        }, this.value)">
          <option value="pending" ${
            order.status === "pending" ? "selected" : ""
          }>Chưa xử lý</option>
          <option value="delivered" ${
            order.status === "delivered" ? "selected" : ""
          }>Đã giao</option>
          <option value="canceled" ${
            order.status === "canceled" ? "selected" : ""
          }>Hủy đơn</option>
        </select>
      </td>
      <td class="action-icons">
        <i class="fa-solid fa-eye" onclick="viewOrderDetails(${order.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteOrder(${order.id})"></i>
      </td>
    `;
    orderList.appendChild(row);
  });
}
// Hàm làm mới (reset filter và hiển thị lại tất cả đơn hàng)
function refreshOrders() {
  // Clear the filter inputs
  const form = document.getElementById("order-filter-form");
  form.reset(); // This will reset all the fields in the form

  // Display all orders (without any filter)
  displayOrders();
}

// Hàm hiển thị danh sách đơn hàng (có thể dùng lại cho cả lọc và làm mới)
function displayOrders(orders = getOrdersFromLocalStorage()) {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Clear existing rows

  orders.forEach((order) => {
    const total = order.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${total.toLocaleString()}đ</td>
      <td>
        <select class="status-dropdown" onchange="updateStatus(${
          order.id
        }, this.value)">
          <option value="pending" ${
            order.status === "pending" ? "selected" : ""
          }>Chưa xử lý</option>
          <option value="delivered" ${
            order.status === "delivered" ? "selected" : ""
          }>Đã giao</option>
          <option value="canceled" ${
            order.status === "canceled" ? "selected" : ""
          }>Hủy đơn</option>
        </select>
      </td>
      <td class="action-icons">
        <i class="fa-solid fa-eye" onclick="viewOrderDetails(${order.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteOrder(${order.id})"></i>
      </td>
    `;
    orderList.appendChild(row);
  });
}