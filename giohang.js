function up() {
    let input = document.getElementById("quantity");
    input.value = parseInt(input.value) + 1;
    updateCart()
}
function down() {
    let input = document.getElementById("quantity");
    if (parseInt(input.value) > 0) { // Đảm bảo giá trị không nhỏ hơn 0
        input.value = parseInt(input.value) - 1;
    }
    if (parseInt(input.value) == 0) openModal()
    updateCart()
}
function openModal() {
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deleteModal").style.display = "none";
}

function confirmDelete() {
    document.getElementById("donhang").style.display = "none";
    document.getElementById("deleteModal").style.display = "none";
}
function tt(){
    document.getElementById("tt").style.display = "flex";
}
function updateCart() {
    let tcong = document.getElementById("quantity").value;
    let gia = document.getElementById("price").innerText.replace(/[^0-9]/g, "");
    let b = parseInt(tcong) * parseInt(gia);
    let c = Math.round(b);
    document.getElementById("tongcong").innerHTML = "Tổng cộng " + tcong + " sản phẩm";
    document.getElementById("sumprice").innerHTML = c.toLocaleString() + "đ";
}
updateCart()

