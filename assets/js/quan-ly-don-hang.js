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
  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
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
        <td>${order.customerInfo.address.province}</td>
        <td>${order.customerInfo.address.district}</td>
        <td>${order.orderDate}</td>
        <td>${order.total.toLocaleString()}đ</td>
        <td>
          <select class="status-dropdown" onchange="updateOrderStatus('${
            order.orderID
          }', this.value)">
            <option value="Chưa xử lý" ${
              order.orderStatus === "Chưa xử lý" ? "selected" : ""
            }>Chưa xử lý</option>
            <option value="Đã xác nhận" ${
              order.orderStatus === "Đã xác nhận" ? "selected" : ""
            }>Đã xác nhận</option>
            <option value="Đã giao thành công" ${
              order.orderStatus === "Đã giao thành công" ? "selected" : ""
            }>Đã giao thành công</option>
            <option value="Đã hủy" ${
              order.orderStatus === "Đã hủy" ? "selected" : ""
            }>Đã hủy</option>
          </select>
        </td>
        <td class="action-icons">
          <i class="fa-solid fa-eye view-order" onclick="viewOrderDetails('${
            order.orderID
          }')"></i>
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

  const statusChange = {
    status: newStatus,
    date: new Date().toLocaleString("vi-VN"), // Lấy thời gian thay đổi trạng thái
  };

  if (!orders[orderIndex].history) {
    orders[orderIndex].history = []; // Nếu chưa có lịch sử, khởi tạo mảng
  }

  // Thêm trạng thái mới vào lịch sử
  orders[orderIndex].history.push(statusChange);

  saveOneOrder(orders[orderIndex]);

  displayOrders();

  alert(`Trạng thái đơn hàng ${orderID} đã được cập nhật thành: ${newStatus}`);
}

// function saveOrdersToLocalStorage(orders) {
//   const existingOrders = Object.keys(localStorage).reduce((acc, key) => {
//     if (key.startsWith("orders#")) {
//       acc[key] = JSON.parse(localStorage.getItem(key));
//     }
//     return acc;
//   }, {});
//   orders.forEach((order) => {
//     const key = `orders${order.orderID}`;
//     if (existingOrders[key]) {
//       // If the key already exists, update the order
//       const existingOrderIndex = existingOrders[key].findIndex(
//         (existingOrder) => existingOrder.orderID === order.orderID
//       );
//       if (existingOrderIndex !== -1) {
//         existingOrders[key][existingOrderIndex] = order;
//       } else {
//         existingOrders[key].push(order);
//       }
//     } else {
//       existingOrders[key] = [order];
//     }
//   });

//   // Save updated data back to localStorage
//   Object.keys(existingOrders).forEach((key) => {
//     localStorage.setItem(key, JSON.stringify(existingOrders[key]));
//   });
// }

function saveOneOrder(updateOrder) {
  const customerID = updateOrder.customerInfo.customerID;
  const localStorageKey = `orders${customerID}`;
  const ordersOfCustomer = JSON.parse(localStorage.getItem(localStorageKey));
  const updateOrderIndex = ordersOfCustomer.findIndex(
    (order, index) => order.orderID === updateOrder.orderID
  );
  ordersOfCustomer[updateOrderIndex] = updateOrder;
  localStorage.setItem(localStorageKey, JSON.stringify(ordersOfCustomer));
}

function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find((o) => o.orderID === orderId);

  if (order) {
    // Hiển thị thông tin cơ bản của đơn hàng
    document.getElementById("customer-name").innerText = `Tên khách hàng: ${
      order.customerInfo.name || "Không xác định"
    }`;
    document.getElementById(
      "order-id"
    ).innerText = `Mã đơn hàng: #${order.orderID}`;
    document.getElementById("order-date").innerText = `Ngày đặt hàng: ${
      order.orderDate || "Không xác định"
    }`;
    document.getElementById("order-address").innerText = `Địa chỉ: ${
      order.customerInfo.address || "Không xác định"
    }`;

    // Hiển thị sản phẩm trong đơn hàng
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

    // Hiển thị tổng cộng đơn hàng
    document.getElementById("order-total").innerText = `Tổng cộng: ${parseInt(
      order.total || 0
    ).toLocaleString()}đ`;

    // Hiển thị lịch sử trạng thái (nếu có)
    const historyList = document.getElementById("order-history");
    historyList.innerHTML = "";
    if (order.history && order.history.length > 0) {
      order.history.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.innerText = `Trạng thái: ${entry.status} - Ngày: ${entry.date}`;
        historyList.appendChild(listItem);
      });
    } else {
      const emptyHistory = document.createElement("li");
      emptyHistory.innerText = "Chưa có lịch sử trạng thái.";
      historyList.appendChild(emptyHistory);
    }

    // Hiển thị chi tiết đơn hàng
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

function filterOrders(event) {
  event.preventDefault(); // Ngăn chặn submit form

  // Lấy giá trị từ form
  const form = event.target;
  const customerName = form.customer.value.toLowerCase().trim(); // Tên khách hàng cần lọc
  const status = form.status.value; // Trạng thái đơn hàng cần lọc
  const sortDistrict = form.sortDistrict.value;
  console.log(sortDistrict);

  const { isValid, message, startDate, endDate } = isValidDateRange(
    form["start-date"].value,
    form["end-date"].value
  );
  if (!isValid) {
    alert(message);
    return;
  }

  // Lấy danh sách đơn hàng từ localStorage hoặc nguồn dữ liệu
  const orders = getOrders(); // Hàm này lấy đơn hàng từ localStorage hoặc nguồn dữ liệu khác

  // Lọc danh sách đơn hàng
  const filteredOrders = orders.filter((order) => {
    // Kiểm tra tên khách hàng (so sánh với customerInfo.name)
    const matchesCustomer = customerName
      ? order.customerInfo.name.toLowerCase().includes(customerName)
      : true;

    // Kiểm tra trạng thái đơn hàng (orderStatus)
    const matchesStatus =
      status && status !== "all" ? order.orderStatus === status : true;

    // Kiểm tra khoảng thời gian
    const orderDate = new Date(order.orderDate);
    const matchesDateRange =
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate);

    // Trả về kết quả nếu thỏa mãn tất cả tiêu chí
    return matchesCustomer && matchesStatus && matchesDateRange;
  });

  console.log(filteredOrders);

  if (sortDistrict !== "all") {
    filteredOrders.sort((a, b) => {
      const districtA = a.customerInfo.address.district.toUpperCase(); // Case insensitive sorting
      const districtB = b.customerInfo.address.district.toUpperCase();
      if (districtA < districtB) {
        return sortDistrict === 'asc' ? -1 : 1;
      }
      if (districtA > districtB) {
        return sortDistrict === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  console.log(filteredOrders);


  // Hiển thị danh sách đơn hàng đã lọc
  displayFilteredOrders(filteredOrders);
}

function displayFilteredOrders(filteredOrders) {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Xóa danh sách cũ

  if (filteredOrders.length === 0) {
    orderList.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center;">Không tìm thấy đơn hàng nào</td>
      </tr>`;
    return;
  }

  filteredOrders.forEach((order) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString("vi-VN"); // Định dạng ngày
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.orderID}</td>
      <td>${order.customerInfo.name}</td>
      <td>${order.customerInfo.address.province}</td>
      <td>${order.customerInfo.address.district}</td>
      <td>${orderDate}</td>
      <td>${order.total.toLocaleString()}đ</td>
      <td>
        <select class="status-dropdown" onchange="updateOrderStatus('${
          order.orderID
        }', this.value)">
          <option value="Chưa xử lý" ${
            order.orderStatus === "Chưa xử lý" ? "selected" : ""
          }>Chưa xử lý</option>
          <option value="Đã xác nhận" ${
            order.orderStatus === "Đã xác nhận" ? "selected" : ""
          }>Đã xác nhận</option>
          <option value="Đã giao thành công" ${
            order.orderStatus === "Đã giao thành công" ? "selected" : ""
          }>Đã giao thành công</option>
          <option value="Đã hủy" ${
            order.orderStatus === "Đã hủy" ? "selected" : ""
          }>Đã hủy</option>
        </select>
      </td>
      <td class="action-icons">
        <i class="fa-solid fa-eye view-order" onclick="viewOrderDetails('${
          order.orderID
        }')"></i>
      </td>
    `;

    orderList.appendChild(row);
  });
}

function refreshOrders() {
  const form = document.querySelector(".search-options-style");
  form.reset(); // Reset toàn bộ form, bao gồm các trường nhập liệu và dropdowns

  displayOrders(); // Hiển thị lại tất cả đơn hàng
}

function isValidDateRange(startDate, endDate) {
  let start = new Date(startDate); // Chuyển đổi thành đối tượng Date
  let end = new Date(endDate);

  if (isNaN(start)) {
    start = new Date("2000-1-1");
  }

  if (isNaN(end)) {
    end = new Date();
  }

  const today = new Date();
  if (start > today || end > today) {
    return {
      isValid: false,
      message: "Ngày tìm kiếm không được lớn hơn ngày hiện tại",
    };
  }

  // Kiểm tra ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc
  if (start > end) {
    return {
      isValid: false,
      message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    };
  }

  return {
    isValid: true,
    message: "Khoảng ngày hợp lệ",
    startDate: start,
    endDate: end,
  };
}
