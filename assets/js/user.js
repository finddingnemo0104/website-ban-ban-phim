if (!localStorage.getItem("orders")) {
    const sampleOrders = [
        {
            id: 1,
            customerPhone: "0797169613",
            date: "2024-11-01",
            address: "279A An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh",
            status: "Đã giao hàng",
            products: [
                { name: "Logitech G Pro X Mechanical Gaming Keyboard", quantity: 1, price: 2000000 },
                { name: "Chuột Logitech G502 HERO", quantity: 2, price: 1500000 }
            ]
        },
        {
            id: 2,
            customerPhone: "0797169613",
            date: "2024-11-02",
            address: "100 Nguyễn Huệ, Quận 1, TP Hồ Chí Minh",
            status: "Chờ thanh toán",
            products: [
                { name: "Bàn phím cơ Ducky One 2", quantity: 1, price: 3000000 }
            ]
        }
    ];
    localStorage.setItem("orders", JSON.stringify(sampleOrders));
}
document.addEventListener("DOMContentLoaded", () => {
    const currentUserPhone = "0869043004"; // Số điện thoại của người dùng hiện tại
    displayOrderHistory(currentUserPhone);
});

function displayOrderHistory(phone) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = orders.filter(order => order.customerPhone === phone);
    
    let totalAmount = 0;
    const orderList = document.getElementsByClassName("order-list")[0];
//    orderList.innerHTML = "";

    userOrders.forEach(order => {
        const totalOrderPrice = order.products.reduce((total, item) => total + item.price * item.quantity, 0);
        totalAmount += totalOrderPrice;

        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <div class="order-header">
                <h3>Đơn hàng #${order.id}</h3>
                <span class="order-status">${order.status}</span>
            </div>
            <div class="order-details">
                <p>Ngày đặt: ${order.date}</p>
                <p>Địa chỉ: ${order.address}</p>
                ${order.products.map(product => `
                    <p>${product.name} - Số lượng: ${product.quantity} - ${product.price.toLocaleString()}đ</p>
                `).join('')}
                <p class="total-price">Tổng cộng: ${totalOrderPrice.toLocaleString()}đ</p>
                <button class="details-btn" onclick="viewOrderDetails(${order.id})">Xem chi tiết</button>
            </div>
        `;
        orderList.appendChild(orderItem);
    });

   // document.getElementById("total-orders").textContent = userOrders.length;
   // document.getElementById("total-amount").textContent = totalAmount.toLocaleString();
}

// Tạm thời chỉ hiển thị một thông báo khi nhấn nút "Xem chi tiết"
function viewOrderDetails(orderId) {
    alert(`Chi tiết đơn hàng ${orderId}`);
}
