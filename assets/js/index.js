function getProduct() {
    if (
      localStorage.getItem("products") === null ||
      JSON.parse(localStorage.getItem("products")).length === 0
    ) {
      localStorage.setItem("products", JSON.stringify(listProduct));
    }
    return JSON.parse(localStorage.getItem("products"));
  }

const data = getProduct(); //lấy dữ liệu từ local storage xuống

const productGrid = document.getElementById("product-grid")//lấy thẻ có id trong " " 

console.log(productGrid)//in test


//duyệt từng phần tử trong mảng data xong gắn vô cái 
for(const product of data) {
    productGrid.innerHTML += `<div class="product-card">
                
                <img src="${product.image}" alt="Logitech G Pro X Mechanical Gaming Keyboard" onclick="window.location ='./detail.html'" link>
                
                <p>${product.name}</p>
            </div>`
}

// const createBtn = (list = gameList) => {
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
  
//   const switchPage = (i, list = gameList) => {
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