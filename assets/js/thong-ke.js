document.addEventListener("DOMContentLoaded", function () {
    displayStatistics();
    filterOrders();
  });
  
  function getOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("orders")) || [];
  }
  
  function displayStatistics() {
    const orders = getOrdersFromLocalStorage();
  
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
      const orderDate = order.date;
  
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
    ).innerText = `${todayOrders} đơn, ${todayRevenue.toLocaleString()}đ`;
    document.querySelector(
      ".stat.all span"
    ).innerText = `${allOrders} đơn, ${allRevenue.toLocaleString()}đ`;
    document.querySelector(
      ".stat.last-month span"
    ).innerText = `${lastMonthOrders} đơn, ${lastMonthRevenue.toLocaleString()}đ`;
  
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
    return order.products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  }
  
  function getTopCustomers(orders) {
    const customerTotals = {};
  
    orders.forEach((order) => {
      const customerId = order.id;
      const customerName = order.customer;
      const orderTotal = calculateOrderTotal(order);
  
      if (!customerTotals[customerId]) {
        customerTotals[customerId] = {
          name: customerName,
          total: 0,
          orderId: order.id,
          date: order.date,
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
          <td>${customer.orderId}</td>
          <td>${customer.name}</td>
          <td>${customer.date}</td>
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
      order.products.forEach((product) => {
        const productId = product.name;
        const productCategory = product.category || "Chưa có"; // Assuming category is available
        const quantitySold = product.quantity;
        const productRevenue = quantitySold * product.price;
  
        if (!productSales[productId]) {
          productSales[productId] = {
            id: productId,
            name: productId,
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
      order.products.forEach((product) => {
        const productId = product.name;
        const productCategory = product.category || "Chưa có"; // Assuming category is available
        const quantitySold = product.quantity;
        const productRevenue = quantitySold * product.price;
  
        if (!productSales[productId]) {
          productSales[productId] = {
            id: productId,
            name: productId,
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
  
  function filterOrders() {
    const orders = getOrdersFromLocalStorage();
  
    const productType = document.getElementById("product-type").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
  
    let filteredOrders = orders;
  
    // Lọc theo loại sản phẩm
    if (productType !== "all") {
      filteredOrders = filteredOrders.filter((order) =>
        order.products.some((product) => product.name === productType)
      );
    }
  
    // Lọc theo khoảng thời gian
    if (startDate) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.date) <= new Date(endDate)
      );
    }
  
    // Hiển thị kết quả lọc trong bảng
    const tableBody = document.getElementById("filtered-orders");
    tableBody.innerHTML = "";
  
    filteredOrders.forEach((order, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.date}</td>
          <td>${calculateOrderTotal(order).toLocaleString()}đ</td>
          <td>${order.status}</td>
          <td>
            <button onclick="viewOrderDetails(${
              order.id
            })">Xem các hóa đơn</button>
          </td>
        `;
      tableBody.appendChild(row);
    });
  }
  
  // Sự kiện lọc và cập nhật
  document
    .getElementById("filter-button")
    .addEventListener("click", filterOrders);
  document.getElementById("refresh-button").addEventListener("click", () => {
    // Làm mới dữ liệu lọc
    displayStatistics();
  });