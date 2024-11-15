let currentPage = 1;
const itemsPerPage = 6;
let currentCategory = ""; // Lưu loại bàn phím hiện đang chọn để lọc

// Dữ liệu sản phẩm mẫu
const products = [
  {
    name: "Logitech G Pro X Mechanical Gaming Keyboard",
    price: 3290000,
    category: "gaming",
    image: "keyboard.jpg",
  },
  {
    name: "Razer BlackWidow V3 Pro",
    price: 4500000,
    category: "mechanical",
    image: "keyboard.jpg",
  },
  {
    name: "Corsair K95 RGB Platinum",
    price: 5000000,
    category: "mechanical",
    image: "keyboard.jpg",
  },
  {
    name: "Keychron K6 Wireless Mechanical Keyboard",
    price: 2000000,
    category: "wireless",
    image: "keyboard.jpg",
  },
  {
    name: "Logitech K380 Multi-Device Bluetooth Keyboard",
    price: 500000,
    category: "wireless",
    image: "keyboard.jpg",
  },
  {
    name: "Ducky One 2 Mini",
    price: 2500000,
    category: "mini",
    image: "keyboard.jpg",
  },
  {
    name: "SteelSeries Apex Pro",
    price: 3500000,
    category: "gaming",
    image: "keyboard.jpg",
  },
  {
    name: "HyperX Alloy FPS Pro",
    price: 1500000,
    category: "mechanical",
    image: "keyboard.jpg",
  },
  {
    name: "Razer Huntsman Mini",
    price: 2200000,
    category: "mini",
    image: "keyboard.jpg",
  },
  {
    name: "Logitech G915 TKL Wireless Keyboard",
    price: 5000000,
    category: "wireless",
    image: "keyboard.jpg",
  },
  {
    name: "Corsair K70 RGB MK.2",
    price: 4500000,
    category: "gaming",
    image: "keyboard.jpg",
  },
  {
    name: "Keychron K2 Wireless RGB Mechanical Keyboard",
    price: 2000000,
    category: "wireless",
    image: "keyboard.jpg",
  },
];

// Hàm hiển thị sản phẩm
function renderProducts(productList) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; // Xóa sản phẩm cũ

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts = productList.slice(startIndex, endIndex);

  currentPageProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()}đ</p>
      <button>Thêm vào giỏ hàng</button>
    `;
    productGrid.appendChild(productCard);
  });

  updatePagination(productList); // Cập nhật phân trang
}

// Hàm lọc sản phẩm
function filterProducts() {
  const nameInput = document.getElementById("product-name").value.toLowerCase();
  const categoryInput =
    currentCategory || document.getElementById("category-dropdown").value;
  const minPriceInput = document.getElementById("min-price").value;
  const maxPriceInput = document.getElementById("max-price").value;

  let filteredProducts = products;

  if (nameInput) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(nameInput)
    );
  }

  if (categoryInput) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryInput
    );
  }

  const minPrice = parseInt(minPriceInput.replace(/[^0-9]/g, ""), 10) || 0;
  const maxPrice =
    parseInt(maxPriceInput.replace(/[^0-9]/g, ""), 10) || Infinity;

  if (
    (minPriceInput && isNaN(minPrice)) ||
    (maxPriceInput && isNaN(maxPrice))
  ) {
    alert("Vui lòng nhập giá trị hợp lệ cho giá.");
    return;
  }

  filteredProducts = filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  currentPage = 1; // Đặt lại trang về trang đầu khi lọc mới
  renderProducts(filteredProducts); // Hiển thị các sản phẩm đã lọc
}

// Hàm cập nhật phân trang
function updatePagination(productList) {
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const pagination = document.querySelector(".pagination");
  const pageNumbers = pagination.querySelector(".page-numbers");
  pageNumbers.innerHTML = ""; // Xóa các số trang cũ

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("span");
    pageNumber.textContent = i;
    pageNumber.classList.add("page-number");
    if (i === currentPage) {
      pageNumber.classList.add("current-page");
    }
    pageNumber.addEventListener("click", () => {
      currentPage = i;
      renderProducts(productList); // Hiển thị lại khi chuyển trang
    });
    pageNumbers.appendChild(pageNumber);
  }

  const prevButton = pagination.querySelector(".prev-page");
  const nextButton = pagination.querySelector(".next-page");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Xử lý khi nhấn trang trước
function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    filterProducts();
  }
}

// Xử lý khi nhấn trang sau
function goToNextPage() {
  const filteredProducts = applyFilters();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts(filteredProducts);
  }
}

// Hàm lấy các sản phẩm đã lọc
function applyFilters() {
  const nameInput = document.getElementById("product-name").value.toLowerCase();
  const categoryInput =
    currentCategory || document.getElementById("category-dropdown").value;
  const minPriceInput = document.getElementById("min-price").value;
  const maxPriceInput = document.getElementById("max-price").value;

  let filteredProducts = products;

  if (nameInput) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(nameInput)
    );
  }

  if (categoryInput) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === categoryInput
    );
  }

  const minPrice = parseInt(minPriceInput.replace(/[^0-9]/g, ""), 10) || 0;
  const maxPrice =
    parseInt(maxPriceInput.replace(/[^0-9]/g, ""), 10) || Infinity;

  if (
    (minPriceInput && isNaN(minPrice)) ||
    (maxPriceInput && isNaN(maxPrice))
  ) {
    alert("Vui lòng nhập giá trị hợp lệ cho giá.");
    return;
  }

  return filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
}

// Thiết lập sự kiện
document
  .getElementById("product-name")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      filterProducts();
    }
  });

document
  .getElementById("min-price")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      filterProducts();
    }
  });

document
  .getElementById("max-price")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      filterProducts();
    }
  });

document
  .getElementById("category-dropdown")
  .addEventListener("change", function () {
    currentCategory = this.value;
    filterProducts();
  });

const categoryLinks = document.querySelectorAll(".filter-category");
categoryLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    currentCategory = this.getAttribute("data-category");
    filterProducts();
  });
});

document.querySelector(".prev-page").addEventListener("click", goToPrevPage);
document.querySelector(".next-page").addEventListener("click", goToNextPage);

// Hiển thị tất cả sản phẩm ban đầu
renderProducts(products);
