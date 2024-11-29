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
    if (currentUser.role !== "admin") {
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
          <select class="status-dropdown" onchange="updateOrderStatus('${order.orderID}', this.value)">
            <option value="chưa xử lý" ${order.orderStatus === "chưa xử lý" ? "selected" : ""}>Chưa xử lý</option>
            <option value="đã xác nhận" ${order.orderStatus === "đã xác nhận" ? "selected" : ""}>Đã xác nhận</option>
            <option value="đã giao thành công" ${order.orderStatus === "đã giao thành công" ? "selected" : ""}>Đã giao thành công</option>
            <option value="đã hủy" ${order.orderStatus === "đã hủy" ? "selected" : ""}>Đã hủy</option>
          </select>
        </td>
        <td class="action-icons">
          <i class="fa-solid fa-eye" onclick="viewOrderDetails('${order.orderID}')"></i>
          <i class="fa-solid fa-trash" onclick="deleteOrder('${order.orderID}')"></i>
        </td>
      `;
    orderList.appendChild(row);
  });
}


function updateOrderStatus(orderID, newStatus) {
  const orders = getOrders();
  // Find the order by ID
  const orderIndex = orders.findIndex((order) => order.orderID === orderID);
  if (orderIndex === -1) {
    alert(`Không tìm thấy đơn hàng ${orderID} !!!`);
    return;
  }

  orders[orderIndex].orderStatus = newStatus;

  saveOrdersToLocalStorage(orders);

  displayOrders();

  alert(
    `Trạng thái đơn hàng ${orderID} đã được cập nhật thành: ${newStatus}`
  );
}


function saveOrdersToLocalStorage(orders) {
  const existingOrders = Object.keys(localStorage).reduce((acc, key) => {
    if (key.startsWith("orders#")) {
      acc[key] = JSON.parse(localStorage.getItem(key));
    }
    return acc;
  }, {});
  orders.forEach((order) => {
    const key = `orders${order.orderID}`;
    if (existingOrders[key]) {
      // If the key already exists, update the order
      const existingOrderIndex = existingOrders[key].findIndex(
        (existingOrder) => existingOrder.orderID === order.orderID
      );
      if (existingOrderIndex !== -1) {
        existingOrders[key][existingOrderIndex] = order;
      } else {
        existingOrders[key].push(order);
      }
    } else {
      existingOrders[key] = [order];
    }
  });

  // Save updated data back to localStorage
  Object.keys(existingOrders).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(existingOrders[key]));
  });
}


function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find((o) => o.orderID === orderId);

  if (order) {
    document.getElementById("customer-name").innerText = `Tên khách hàng: ${order.customerInfo.name || "Không xác định"}`;
    document.getElementById("order-id").innerText = `Mã đơn hàng: #${order.orderID}`;
    document.getElementById("order-date").innerText = `Ngày đặt hàng: ${order.orderDate || "Không xác định"}`;
    document.getElementById("order-address").innerText = `Địa chỉ:${order.customerInfo.address || "Không xác định"}`;

    const productList = document.getElementById("order-products-list");
    productList.innerHTML = "";
    if (order.items && order.items.length > 0) {
      order.items.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.name || "Sản phẩm không xác định"}</td>
          <td>${product.quantity || 0}</td>
          <td>${parseInt(product.price || 0).toLocaleString()}đ</td>
        `;
        productList.appendChild(row);
      });
    } else {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="3" style="text-align:center;">Không có sản phẩm</td>`;
      productList.appendChild(emptyRow);
    }

    document.getElementById("order-total").innerText = `Tổng cộng: ${parseInt(order.total || 0).toLocaleString()}đ`;
    const historyList = document.getElementById("order-history");
    historyList.innerHTML = ""; 
    if (order.history && order.history.length > 0) {
      order.history.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.innerText = `Trạng thái: ${entry.status || "Không rõ"} - Ngày: ${entry.date || "Không rõ"}`;
        historyList.appendChild(listItem);
      });
    } else {
      const emptyHistory = document.createElement("li");
      emptyHistory.innerText = "Không có lịch sử trạng thái.";
      historyList.appendChild(emptyHistory);
    }
    document.getElementById("order-management").style.display = "none";
    document.getElementById("order-details").style.display = "block";
  } else {
    alert("Không tìm thấy thông tin đơn hàng! Vui lòng thử lại.");
  }
}

// function deleteOrder(orderId) {
//   const orders = getOrders();
//   const orderIndex = orders.findIndex((order) => order.orderID === orderId);
//   console.log(orderIndex)

//   if (orderIndex !== -1) {
//     const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderId} ?`);
//     if (confirmDelete) {
//       orders.splice(orderIndex, 1);
//       console.log(orders)
//       localStorage.setItem(`orders${orderId}`, JSON.stringify(orders));
//       displayOrders();
//       alert(`Đơn hàng ${orderId} đã được xóa thành công.`);
//     }
//   } else {
//     alert(`Không tìm thấy đơn hàng ${orderId}!`);
//   }
// }

function closeOrderDetails() {
  document.getElementById("order-details").style.display = "none";
  document.getElementById("order-management").style.display = "block";
}