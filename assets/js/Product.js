const products = getProduct();
function getProduct() {
  if (
    localStorage.getItem("products") === null ||
    JSON.parse(localStorage.getItem("products")).length === 0
  ) {
    localStorage.setItem("products", JSON.stringify(listProduct));
  }
  return JSON.parse(localStorage.getItem("products"));
}

const productsPerPage = 6;
let currentPage = 1;

//render tất cả sản phẩm trong local storage
function renderProducts(page) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; // Clear existing products

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach(product => { 
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <div class="wrap-img-cart">
  <img src="${product.image}" alt="${product.name}" onclick="window.location ='./detail.html?id=${encodeURIComponent(product.ID)}'">
    </div>
  <p>${product.name}</p>
  <span class="price">${Number(product.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
  <button class="add-to-cart-BTN" onclick="addToCard('${product.ID}')"> Thêm vào giỏ hàng </button>
`;

    productGrid.appendChild(productCard);
  });
}

// tạo nút trang
function createPagination(productList) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; //

  const totalPages = Math.ceil(productList.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const paginationItem = document.createElement("li");
    paginationItem.classList.add("pagination-item");
    if (i === currentPage) {
      paginationItem.classList.add("pagination-item--active");
    }

    const paginationLink = document.createElement("a");
    paginationLink.href = "#";
    paginationLink.classList.add("pagination-item-link");
    paginationLink.textContent = i;
    paginationLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderProducts1(currentPage, productList);
      createPagination(productList);
    });

    paginationItem.appendChild(paginationLink);
    paginationContainer.appendChild(paginationItem);
  }
}

renderProducts(currentPage);
createPagination(products);


//Tìm kiếm cơ bản

const searchBTN = document.getElementById("searchBTN")
const searchText = document.getElementById("searchText")

function renderProducts1(page,productList) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; 

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = productList.slice(start, end);

  paginatedProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <div class="wrap-img-cart">
  <img src="${product.image}" alt="${product.name}" onclick="window.location ='./detail.html?id=${encodeURIComponent(product.ID)}'">
    </div>
  <p>${product.name}</p>
  <span class="price">${Number(product.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span> 
  <button class="add-to-cart-BTN" onclick="addToCard('${product.ID}')"> Thêm vào giỏ hàng </button>
`;
    productGrid.appendChild(productCard);
  });
}


//Tìm kiếm nâng cao(filter hãng, giá tiền)
const filterByBrand =document.getElementById("search-filter-brand")
const minPrice =document.getElementById("filter-price-min")
const maxPrice =document.getElementById("filter-price-max")
// const priceInputValue =document.querySelectorAll(".search-filter-price input")

function productSearch(text){
 const result=[];

// for(let i=0;i<priceInputValue.length;i++){
//   priceInputValue[i].addEventListener("input", e =>{
//     let minInputPrice = parseInt(priceInputValue[0].value)
//     let maxInputPrice = parseInt(priceInputValue[1].value)
//   })
// }

 let minInputPrice, maxInputPrice
//  if(minPrice.value==="" || maxPrice.value===""){
//   minInputPrice=0
//   maxInputPrice=1000000000
//  } else { 
//   minInputPrice=minPrice.value
//   maxInputPrice=maxPrice.value
//   }

if(minPrice.value===""){
  minInputPrice=0;
} else{
  minInputPrice=minPrice.value
}

if(maxPrice.value===""){
  maxInputPrice=100000000;
} else{
  maxInputPrice=maxPrice.value
}


  for(const product of products)
    if(product.name.toLowerCase().includes(text.toLowerCase()) 
      && product.category.includes(filterByBrand.value)
      && Number(product.price) >= Number(minInputPrice) && Number(product.price) <= Number(maxInputPrice))
      
      result.push(product);
    return result;
  
}

searchBTN.onclick = ()=>{
  renderProducts1(1,productSearch(searchText.value))
  createPagination(productSearch(searchText.value))
}


function filterByCategory(category) {
  const filteredProducts = products.filter(product => product.category === category);
  renderProducts1(1, filteredProducts);
  createPagination(filteredProducts);
}

document.querySelectorAll(".links a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const category = event.target.dataset.category;
    filterByCategory(category);
  });
});


