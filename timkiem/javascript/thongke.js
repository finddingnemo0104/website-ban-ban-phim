// thongke.js

// Dữ liệu mẫu để mô phỏng thống kê động
const data = {
  today: {
    revenue: 12000000, // Doanh thu hôm nay
    orders: 4, // Số đơn hàng hôm nay
  },
  allTime: {
    revenue: 120000000, // Doanh thu tất cả thời gian
    orders: 40, // Số đơn hàng tổng cộng
  },
  lastMonth: {
    revenue: 11000000, // Doanh thu tháng trước
    orders: 3, // Số đơn hàng tháng trước
  },
  topCustomers: [
    {
      name: "aaaa",
      email: "abc@gmail.com",
      date: "17/11/2024",
      total: 20000000,
    },
    {
      name: "bbbb",
      email: "bbb@gmail.com",
      date: "10/11/2024",
      total: 15000000,
    },
    {
      name: "cccc",
      email: "ccc@gmail.com",
      date: "12/11/2024",
      total: 10000000,
    },
    {
      name: "dddd",
      email: "ddd@gmail.com",
      date: "13/11/2024",
      total: 5000000,
    },
    {
      name: "eeee",
      email: "eee@gmail.com",
      date: "14/11/2024",
      total: 3000000,
    },
  ],
  topProducts: [
    {
      name: "Logitech G Pro X Mechanical",
      category: "Bàn phím gaming",
      sold: 100,
      revenue: 320000000,
    },
    {
      name: "Corsair K95 RGB Platinum",
      category: "Bàn phím gaming",
      sold: 90,
      revenue: 270000000,
    },
    {
      name: "Razer DeathAdder V2",
      category: "Chuột gaming",
      sold: 150,
      revenue: 180000000,
    },
    {
      name: "SteelSeries Arctis 7",
      category: "Tai nghe",
      sold: 75,
      revenue: 225000000,
    },
    {
      name: "Razer Kraken V3",
      category: "Tai nghe",
      sold: 60,
      revenue: 180000000,
    },
  ],
};

// Hàm cập nhật thống kê tổng quan
function updateStatistics() {
  // Cập nhật thống kê tổng quan
  document.querySelector(".stat.today span").textContent = formatCurrency(
    data.today.revenue
  );
  document.querySelector(
    ".stat.today"
  ).innerHTML = `Hôm nay<br /><span>${formatCurrency(
    data.today.revenue
  )}</span><br />${data.today.orders} đơn hàng`;

  document.querySelector(".stat.all span").textContent = formatCurrency(
    data.allTime.revenue
  );
  document.querySelector(
    ".stat.all"
  ).innerHTML = `Tất cả<br /><span>${formatCurrency(
    data.allTime.revenue
  )}</span><br />${data.allTime.orders} đơn hàng`;

  document.querySelector(".stat.last-month span").textContent = formatCurrency(
    data.lastMonth.revenue
  );
  document.querySelector(
    ".stat.last-month"
  ).innerHTML = `Tháng trước<br /><span>${formatCurrency(
    data.lastMonth.revenue
  )}</span><br />${data.lastMonth.orders} đơn hàng`;
}

// Hàm cập nhật bảng khách hàng hàng đầu
function updateTopCustomers() {
  const tableBody = document.querySelector("#top-customers tbody");
  tableBody.innerHTML = ""; // Xóa các dòng hiện tại

  data.topCustomers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.date}</td>
        <td>${formatCurrency(customer.total)}</td>
        <td><a href="#">Xem chi tiết</a></td>
      `;
    tableBody.appendChild(row);
  });
}

// Hàm cập nhật bảng sản phẩm bán chạy nhất
function updateTopProducts() {
  const tableBody = document.querySelector("#top-products tbody");
  tableBody.innerHTML = ""; // Xóa các dòng hiện tại

  data.topProducts.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.sold}</td>
        <td>${formatCurrency(product.revenue)}</td>
        <td><a href="#">Xem chi tiết</a></td>
      `;
    tableBody.appendChild(row);
  });
}

// Hàm phụ để định dạng tiền tệ (VND)
function formatCurrency(value) {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

// Khởi tạo trang với dữ liệu
document.addEventListener("DOMContentLoaded", () => {
  updateStatistics();
  updateTopCustomers();
  updateTopProducts();
});
