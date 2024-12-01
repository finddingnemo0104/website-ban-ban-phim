document.addEventListener("DOMContentLoaded", function () {
  displayStatistics();
  // filterOrders();
});

function getOrdersFromLocalStorage() {
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

const orders = getOrdersFromLocalStorage();

function displayStatistics() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const lastMonthStr = lastMonth.toISOString().split("T")[0]; // YYYY-MM-DD

  let todayOrders = 0,
    allOrders = 0,
    lastMonthOrders = 0;
  let todayRevenue = 0,
    allRevenue = 0,
    lastMonthRevenue = 0;
  orders.forEach((order) => {
    const orderDate = order.orderDate.split(" ")[0];
    // Đơn hàng và doanh thu hôm nay
    if (orderDate === todayStr) {
      todayOrders++;
      todayRevenue += calculateOrderTotal(order);
    }

    // Tất cả đơn hàng và doanh thu
    allOrders++;
    allRevenue += calculateOrderTotal(order);

    // Đơn hàng và doanh thu của tháng trước
    if (orderDate >= lastMonthStr && orderDate < todayStr) {
      lastMonthOrders++;
      lastMonthRevenue += calculateOrderTotal(order);
    }
  });

  // Cập nhật thống kê trên trang web
  document.querySelector(
    ".stat.today span"
  ).innerText = `${todayRevenue.toLocaleString()}đ
                  ${todayOrders} đơn`;
  document.querySelector(
    ".stat.all span"
  ).innerText = `${allRevenue.toLocaleString()}đ
                  ${allOrders} đơn`;
  document.querySelector(
    ".stat.last-month span"
  ).innerText = `${lastMonthRevenue.toLocaleString()}đ
                  ${lastMonthOrders} đơn`;

  // Top 5 khách hàng
  const topCustomers = getTopCustomers(orders);
  updateTopCustomersTable(topCustomers);

  // Top 5 sản phẩm bán chạy
  const topProducts = getTopProducts(orders);
  updateTopProductsTable(topProducts);

  // Top 5 sản phẩm bán ít
  const leastProducts = getLeastSellingProducts(orders);
  updateLeastProductsTable(leastProducts);
}

function calculateOrderTotal(order) {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}

function getTopCustomers(orders) {
  const customerTotals = {};

  orders.forEach((order) => {
    const customerId = order.customerInfo.customerID;
    const customerName = order.customerInfo.name;
    const orderTotal = calculateOrderTotal(order);

    if (!customerTotals[customerId]) {
      customerTotals[customerId] = {
        customerId: customerId,
        name: customerName,
        total: 0,
      };
    }
    customerTotals[customerId].total += orderTotal;
  });

  return Object.values(customerTotals).sort((a, b) => b.total - a.total);
}

function updateTopCustomersTable(customers) {
  const customerTable = document.querySelector("#top-orders tbody");
  customerTable.innerHTML = "";
  customers.slice(0, 5).forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${customer.customerId}</td>
          <td>${customer.name}</td>
          <td>${customer.total.toLocaleString()}đ</td>
          <td><button onclick="viewOrderDetails(${
            customer.orderId
          })">Xem</button></td>
        `;
    customerTable.appendChild(row);
  });
}

function getTopProducts(orders) {
  const productSales = {};

  orders.forEach((order) => {
    order.items.forEach((product) => {
      const productId = product.ID;
      const productName = product.name;
      const productCategory = product.category || "Chưa có"; // Assuming category is available
      const quantitySold = product.quantity;
      const productRevenue = quantitySold * product.price;

      if (!productSales[productId]) {
        productSales[productId] = {
          id: productId,
          name: productName,
          category: productCategory,
          sold: 0,
          totalRevenue: 0,
        };
      }
      productSales[productId].sold += quantitySold;
      productSales[productId].totalRevenue += productRevenue;
    });
  });

  // Sort products by quantity sold in descending order
  return Object.values(productSales).sort((a, b) => b.sold - a.sold);
}

function updateTopProductsTable(products) {
  const productTable = document.querySelector("#top-products tbody");
  productTable.innerHTML = "";
  products.slice(0, 5).forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.sold}</td>
          <td>${product.totalRevenue.toLocaleString()}đ</td>
          <td><button onclick="viewProductDetails(${
            product.id
          })">Xem</button></td>
        `;
    productTable.appendChild(row);
  });
}

function getLeastSellingProducts(orders) {
  const productSales = {};

  orders.forEach((order) => {
    order.items.forEach((product) => {
      const productId = product.ID;
      const productName = product.name;
      const productCategory = product.category || "Chưa có"; // Assuming category is available
      const quantitySold = product.quantity;
      const productRevenue = quantitySold * product.price;

      if (!productSales[productId]) {
        productSales[productId] = {
          id: productId,
          name: productName,
          category: productCategory,
          sold: 0,
          totalRevenue: 0,
        };
      }

      productSales[productId].sold += quantitySold;
      productSales[productId].totalRevenue += productRevenue;
    });
  });

  // Sort products by quantity sold in ascending order (least selling first)
  return Object.values(productSales).sort((a, b) => a.sold - b.sold);
}

function updateLeastProductsTable(products) {
  const leastProductTable = document.querySelector("#least-products tbody");
  leastProductTable.innerHTML = "";
  products.slice(0, 5).forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.sold}</td>
          <td>${product.totalRevenue.toLocaleString()}đ</td>
          <td><button onclick="viewProductDetails(${
            product.id
          })">Xem</button></td>
        `;
    leastProductTable.appendChild(row);
  });
}

// function filterOrders() {
//   const orders = getOrdersFromLocalStorage();

//   const productType = document.getElementById("product-type").value;
//   const startDate = document.getElementById("start-date").value;
//   const endDate = document.getElementById("end-date").value;

//   let filteredOrders = orders;

//   // Lọc theo loại sản phẩm
//   if (productType !== "all") {
//     filteredOrders = filteredOrders.filter((order) =>
//       order.products.some((product) => product.name === productType)
//     );
//   }

//   // Lọc theo khoảng thời gian
//   if (startDate) {
//     filteredOrders = filteredOrders.filter(
//       (order) => new Date(order.date) >= new Date(startDate)
//     );
//   }
//   if (endDate) {
//     filteredOrders = filteredOrders.filter(
//       (order) => new Date(order.date) <= new Date(endDate)
//     );
//   }

//   // Hiển thị kết quả lọc trong bảng
//   const tableBody = document.getElementById("filtered-orders");
//   tableBody.innerHTML = "";

//   filteredOrders.forEach((order, index) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${order.id}</td>
//         <td>${order.customer}</td>
//         <td>${order.date}</td>
//         <td>${calculateOrderTotal(order).toLocaleString()}đ</td>
//         <td>${order.status}</td>
//         <td>
//           <button onclick="viewOrderDetails(${
//             order.id
//           })">Xem các hóa đơn</button>
//         </td>
//       `;
//     tableBody.appendChild(row);
//   });
// }

// Sự kiện lọc và cập nhật
// document
//   .getElementById("filter-button")
//   .addEventListener("click", filterOrders);
document.getElementById("refresh-button").addEventListener("click", () => {
  // Làm mới dữ liệu lọc
  const orders = getOrdersFromLocalStorage();
  displayStatistics(orders);
});

// This function is triggered when the "eye" icon is clicked for a customer in the top 5 list.
// function viewCustomerOrders(customerId) {
//   console.log("Clicked view for customer:", customerId); // Kiểm tra khi nhấn vào biểu tượng
//   const orders = getOrdersFromLocalStorage(); // Lấy tất cả đơn hàng từ localStorage
//   const customerOrders = orders.filter(
//     (order) => order.customerInfo.customerID === customerId
//   );
//   console.log("Found customer orders:", customerOrders); // Kiểm tra đơn hàng tìm thấy
//   if (customerOrders.length > 0) {
//     // Lấy phần tử để hiển thị đơn hàng
//     const tableBody = document.querySelector("#customer-orders-table tbody");
//     if (tableBody) {
//       // Xóa nội dung cũ trước khi thêm mới
//       tableBody.innerHTML = "";
//       customerOrders.forEach((order) => {
//         const row = document.createElement("tr");
//         // Thêm thông tin đơn hàng vào bảng
//         row.innerHTML = `
//           <td>${order.orderID}</td>
//           <td>${order.orderDate}</td>
//           <td>${order.total}</td>
//           <td>${order.orderStatus}</td>
//         `;
//         tableBody.appendChild(row);
//       });
//     } else {
//       console.error("Không tìm thấy phần tử bảng để hiển thị đơn hàng!");
//     }
//   } else {
//     console.log("No orders found for this customer.");
//     alert("Không tìm thấy đơn hàng của khách hàng này.");
//   }
// }

function isValidDateRange(startDate, endDate) {
  let start = new Date(startDate); // Chuyển đổi thành đối tượng Date
  let end = new Date(endDate);
  // Kiểm tra ngày hợp lệ
  if (isNaN(start) && isNaN(end)) {
    return { isValid: false, message: "Bạn cần nhập khoảng thời gian muốn tìm kiếm" };
  }

  if (isNaN(start)) {
    start = new Date("2000-1-1");
  }
  
  if (isNaN(end)) {
    end = new Date();
  }
  
  const today = new Date();
  if (start > today || end > today) {
    return { isValid: false, message: "Ngày tìm kiếm không được lớn hơn ngày hiện tại" };
  }

  // Kiểm tra ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc
  if (start > end) {
    return {
      isValid: false,
      message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    };
  }

  return { isValid: true, message: "Khoảng ngày hợp lệ" };
}

function displayOrdersByProductID(productID) {
  let orders = getOrdersFromLocalStorage();
  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  orders = orders.filter(
    (order) => order.items.filter((item) => item.ID === productID).length > 0
  );
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

function viewOrdersOfProduct(e, productID) {
  document
    .getElementsByClassName("model-view-orders-product-container")[0]
    .classList.add("open");
  const products = getProduct();
  const productFound = products.find((product) => product.ID === productID);

  // Display product details
  const htmlProductDetails = `
      <div style="display: flex; margin-bottom: 30px">
        <img
            src="${productFound.image}"
            alt="product-image"
            style="height: auto; width: 50%; margin-right: 20px"
          />
        <div style="margin-left: 20px">
            <h3 style="margin: 0px;">${productFound.ID}</h3>
            <h1 style="color: #21568a">${productFound.name}</h1>
            <h2 style="color: red; margin: 0px">${productFound.price}</h2>
            <div class="product-attribute">
                <h2 class="attribute-header">Số lượng:</h2>
                <p class="attribute-body">${productFound.quantity}</p>
            </div>
            <div class="product-attribute">
                <h2 class="attribute-header">Danh mục:</h2>
                <p class="attribute-body">${productFound.category}</p>
            </div>
            <div class="product-attribute">
                <h2 class="attribute-header"">Hãng:</h2>
                <p class="attribute-body">${productFound.brand}</p>
            </div>
        </div>
      </div>
`;

  const productDetailsID = document.querySelector(".product-details");

  productDetailsID.innerHTML = htmlProductDetails;
  displayOrdersByProductID(productID);
}

// Cancel model view product details
const cancelViewDetailsID = document.getElementsByClassName(
  "cancel-view-details"
)[0];

function cancelViewDetails(e) {
  document
    .getElementsByClassName("model-view-orders-product-container")[0]
    .classList.remove("open");
}

cancelViewDetailsID.addEventListener("click", cancelViewDetails);

function viewOrderDetails(orderId) {
  const orders = getOrdersFromLocalStorage();
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
    // document.getElementById("order-management").style.display = "none";
    document.getElementById("order-details").style.display = "block";
  } else {
    alert("Không tìm thấy thông tin đơn hàng! Vui lòng thử lại.");
  }
}

function closeOrderDetails() {
  document.getElementById("order-details").style.display = "none";
  document.querySelector(
    ".model-view-orders-product-container"
  ).style.overflow = "auto";
}

// --------------------------------------------------------------------------------- //

// Display model view customer details
function viewOrdersOfCustomer(e, customerID) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.add("open");
  const customers = JSON.parse(localStorage.getItem("customers"));
  const customerFound = customers.find(
    (customer) => customer.ID === customerID
  );
  const formattedDate = new Date(customerFound.dob).toLocaleDateString("en-GB");
  let avatarURL =
    customerFound.gender === "Nam"
      ? "./assets/Image/quan-ly-khach-hang/male-customer.png"
      : customerFound.gender === "Nữ"
      ? "./assets/Image/quan-ly-khach-hang/female-customer.jpg"
      : "./assets/Image/quan-ly-khach-hang/other-customer.jpg";

  // Display customer details
  const htmlCustomerDetails = `
        <div style="display: flex; margin-bottom: 30px">
          <img
            src="${avatarURL}"
            alt="customer-image"
            style="height: 80%; width: 30%; margin-right: 20px"
          />
          <div style="margin-left: 20px">
            <h3 style="margin: 0px">${customerFound.ID}</h3>
            <h1 style="color: #21568a">${customerFound.name}</h1>
            <div class="product-attribute">
              <h2 class="attribute-header">Giới tính:</h2>
              <p class="attribute-body">${customerFound.gender}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Email:</h2>
              <p class="attribute-body">${customerFound.email}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Số điện thoại:</h2>
              <p class="attribute-body">${customerFound.phone}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Ngày sinh:</h2>
              <p class="attribute-body">${formattedDate}</p>
            </div>
            <div class="product-attribute">
              <h2 class="attribute-header">Địa chỉ:</h2>
              <p class="attribute-body">${customerFound.address}</p>
            </div>
          </div>
        </div>
`;

  const customerDetailsID = document.querySelector(".customer-details");

  customerDetailsID.innerHTML = htmlCustomerDetails;
  displayOrdersByCustomerID(customerID);
}

function displayOrdersByCustomerID(customerID) {
  let orders = getOrdersFromLocalStorage();
  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  orders = orders.filter((order) => order.customerInfo.customerID === customerID);
  const orderList = document.getElementById("order-list-of-customer");
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
          <i class="fa-solid fa-eye view-order" onclick="viewOrderDetailInCustomer('${
            order.orderID
          }')"></i>
        </td>
      `;
    orderList.appendChild(row);
  });
}

function cancelViewDetails(e) {
  document
    .getElementsByClassName("model-view-details-container")[0]
    .classList.remove("open");
}

function viewOrderDetailInCustomer(orderId) {
  const orders = getOrdersFromLocalStorage();
  const order = orders.find((o) => o.orderID === orderId);

  if (order) {
    // Hiển thị thông tin cơ bản của đơn hàng
    document.getElementById("customer-name-customer").innerText = `Tên khách hàng: ${
      order.customerInfo.name || "Không xác định"
    }`;
    document.getElementById(
      "order-id-customer"
    ).innerText = `Mã đơn hàng: #${order.orderID}`;
    document.getElementById("order-date-customer").innerText = `Ngày đặt hàng: ${
      order.orderDate || "Không xác định"
    }`;
    document.getElementById("order-address-customer").innerText = `Địa chỉ: ${
      order.customerInfo.address || "Không xác định"
    }`;

    // Hiển thị sản phẩm trong đơn hàng
    const productList = document.getElementById("order-products-list-customer");
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
    // document.getElementById("order-management").style.display = "none";
    document.getElementById("order-details-customer").style.display = "block";
  } else {
    alert("Không tìm thấy thông tin đơn hàng! Vui lòng thử lại.");
  }
}

function closeOrderDetailsInCustomer() {
  document.getElementById("order-details-customer").style.display = "none";
  document.querySelector(
    ".model-view-details-container"
  ).style.overflow = "auto";
}
