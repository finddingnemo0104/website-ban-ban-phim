// import Product from "./productData.js";

// let currentPage=1;
// let perPage = 6;
// let totalPage =0;
// let perProduct=[];

// let productSearch=[];

// function renderProduct(arr){
//     const productListContainer=document.querySelector(".product-grid");
//     if(productListContainer){
//         productListContainer.innerHTML="";

//         arr.forEach((products) => {
//         const productSection=document.createElement("section");
//         productSection.classList.add("cart");
        
//         productSection.innerHTML = `
//         <!-- <div class="product-card">
            
//             <img src="${products.image}" alt="${products.name}" onclick="window.location ='./detail.html?id=${
//                 products.ID
//             }'" link>
            
//             <p>${product.name}</p>
//         </div>
//         `;
//     });
// }
// }

// const createBtn = (list = Product) => {
//     const quantity = Math.ceil(list.length / 12);
//     const pageNumberContainer = document.querySelector(".product-grid");
//     pageNumberContainer.innerHTML = "";
//     if (quantity <= 1) return;
//     for (let i = 1; i <= quantity; i++) {
//       const btn = document.createElement("button");
//       btn.classList.add(".pagination-item");
//       btn.id = `page-number${i}`;
//       btn.textContent = i;
//       btn.value = i;
  
//       btn.onclick = () => {
//         switchPage(i, list);
//       };
//       pageNumberContainer.append(btn);
//     }
//   };
  
//   const switchPage = (i, list = Product) => {
//     const gameGrid = document.getElementById(".product-grid");
//     gameGrid.innerHTML = "";
//     const listbtn = document.getElementsByClassName(".pagination-item");
//     for (const currbtn of listbtn) {
//       currbtn.classList.remove("page-active");
//     }
//     const btn = document.getElementById(`page-number${i}`);
//     if (btn == undefined) {
//       createPage(0, 12, list);
//       return;
//     }
//     createPage((btn.value - 1) * 12, btn.value * 12, list);
//     btn.classList.add("page-active");
//   };

// Assuming you have a list of products
const products = JSON.parse(localStorage.getItem("products")) || [];
const productsPerPage = 6; // Number of products per page
let currentPage = 1;

// Function to render products for the current page
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
      <img src="${product.image}" alt="${product.name}" onclick="window.location ='./detail.html?id=${product.ID}'">
      <p>${product.name}</p>
    `;
    productGrid.appendChild(productCard);
  });
}

// Function to create pagination buttons
function createPagination() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Clear existing pagination

  const totalPages = Math.ceil(products.length / productsPerPage);

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
      renderProducts(currentPage);
      createPagination();
    });

    paginationItem.appendChild(paginationLink);
    paginationContainer.appendChild(paginationItem);
  }
}

// Initial render
renderProducts(currentPage);
createPagination();
