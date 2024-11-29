function getOrders() {
  const orderKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("orders#")
  );
  let orders = [];
  orderKeys.forEach((key, index) => {
    const ordersOfCustomer = JSON.parse(localStorage.getItem(key));
    orders = orders.concat(ordersOfCustomer);
  });
  return orders;
}

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
  const orders = getOrders();
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Clear existing rows

  orders.forEach((order) => {
    // const total = order.items.reduce(
    //   (sum, item) => sum + item.quantity * item.price,
    //   0
    // );
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${order.orderID}</td>
        <td>${order.customerInfo.name}</td>
        <td>${order.orderDate}</td>
        <td>${order.total.toLocaleString()}đ</td>
        <td>
          <select class="status-dropdown" onchange="updateStatus(${
            order.orderID
          }, this.value)">
            <option value="chưa xử lý" ${
              order.orderStatus === "chưa xử lý" ? "selected" : ""
            }>Chưa xử lý</option>
            <option value="đã xác nhận" ${
              order.orderStatus === "đã xác nhận" ? "selected" : ""
            }>Đã xác nhận</option>
            <option value="đã giao thành công" ${
              order.orderStatus === "đã giao thành công" ? "selected" : ""
            }>Đã giao thành công</option>
            <option value="đã hủy" ${
              order.orderStatus === "đã hủy" ? "selected" : ""
            }>Đã hủy</option>
          </select>
        </td>
        <td class="action-icons">
          <i class="fa-solid fa-eye" onclick="viewOrderDetails(${
            order.orderID
          })"></i>
          <i class="fa-solid fa-trash" onclick="deleteOrder(${order.orderID})"></i>
        </td>
      `;
    orderList.appendChild(row);
  });
}
