let User = JSON.parse(localStorage.getItem("currentUser")) || [];
let IDUser = User.ID;
let infUser = JSON.parse(localStorage.getItem("currentUser"));

const orderStatus = {
  pending: "Chưa xử lý",
  confirmed: "Đã xác nhận",
  successful: "Đã giao thành công",
  canceled: "Đã hủy"
}
  
function showadr() {
  document.getElementById("address-input").style.display = "block";
}

function hideadr() {
  document.getElementById("address-input").style.display = "none";
}

function showBank() {
  // Hiển thị thông tin chuyển khoản
  const ttck = document.getElementById("ttck");
  if (ttck) {
    ttck.style.display = "block";
    ttck.innerHTML = `
            <label><strong>STK: 123456789</strong></label><br>
            <label><strong>Ngân hàng: ACB</strong></label><br>
            <label><strong>Tên tài khoản: SGU CLICK</strong></label><br>
            <button type="submit" id="ck" onclick="dtt()">Đã chuyển khoản</button><br>
        `;
  }
  document.getElementById("the").style.display = "none";
  document.getElementById("tg").style.display = "none";
  document.getElementById("cvv").style.display = "none";

  autoClickButton();
}
let isConfirmed = false;
function dtt() {
  const button = document.getElementById("ck");
  button.classList.add("clicked");
  isConfirmed = true;
}
function showCard() {
  document.getElementById("the").style.display = "block";
  document.getElementById("tg").style.display = "block";
  document.getElementById("cvv").style.display = "block";
  document.getElementById("ttck").style.display = "none";
}
function hideCard() {
  document.getElementById("the").style.display = "none";
  document.getElementById("tg").style.display = "none";
  document.getElementById("cvv").style.display = "none";
  document.getElementById("ttck").style.display = "none";
}
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
});
function checkDefault() {
  const defaultAdr = document.getElementById("default_address").checked;
  let adr = JSON.parse(localStorage.getItem("currentUser")) || [];
  let address = "( " + adr.address + " )";
  if (defaultAdr && adr.address !== "")
    document.getElementById("defAdr").innerHTML = address;
}
checkDefault();

const nameDef = document.getElementById("hoTen");
const phoneDef = document.getElementById("SDT");
nameDef.placeholder=infUser.name;
phoneDef.placeholder=infUser.phone;
function validateForm(event) {
    const name = document.getElementById("hoTen");
    const phone = document.getElementById("SDT");
    const otherAdr = document.getElementById("other-address").checked;
    const adr = document.getElementById("address-input");
    const payCard = document.getElementById("PayByCard").checked;
    const soThe = document.getElementById("the");
    const thoiHan = document.getElementById("tg");
    const cvv = document.getElementById("cvv");
    const defaultAdr = document.getElementById("default_address").checked;
    const checkBox = document.getElementById("ck");
    const bank=document.getElementById("chuyen_khoan").checked;
    let cart = JSON.parse(localStorage.getItem("cart" + IDUser)) || 0;
    // Validate name
    if(cart===0){
        alert("Giỏ hàng của bạn đang trống hãy thêm sản phẩm vào giỏ hàng");
        window.location.href = "index.html";
        return true;
    }
    

    // Validate phone number
    const phoneRegex = /^[0-9]{10,11}$/;
    if (phone.value.trim() !== "" && !phoneRegex.test(phone.value.trim())) {
        alert("SĐT không hợp lệ! Vui lòng nhập 10 hoặc 11 chữ số.");
        phone.focus();
        event.preventDefault();
        return false;
    }

    if (defaultAdr) {
        let addr = JSON.parse(localStorage.getItem("currentUser")) || [];
        if (addr.address === "") {
            document.getElementById("other-address").checked = true;
            showadr();
            alert("Vui lòng nhập địa chỉ!");
            adr.focus();
            event.preventDefault();
            return false;
        }
    }
    
    // Validate address if "Nhập địa chỉ khác" is selected
    if (adr.value.trim() === "" && otherAdr) {
        alert("Vui lòng nhập địa chỉ!");
        adr.focus();
        event.preventDefault();
        return false;
    }
    if (bank&&!isConfirmed) {
        alert("Bạn chưa xác nhận đã chuyển khoản thành công");
        checkBox.focus();
        event.preventDefault();
        return false;
    }
    // Validate card payment fields if "Thanh toán bằng thẻ" is selected
    if (payCard) {
        // Validate số thẻ (16 digits)
        const cardNumberRegex = /^[0-9]{16}$/;
        if (!cardNumberRegex.test(soThe.value.trim())) {
            alert("Số thẻ không hợp lệ! Vui lòng nhập 16 chữ số.");
            soThe.focus();
            event.preventDefault();
            return false;
        }

        // Validate thời hạn thẻ (MM/YY)
        const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationRegex.test(thoiHan.value.trim())) {
            alert("Thời hạn thẻ không hợp lệ! Vui lòng nhập định dạng MM/YY. Ví dụ 12/2025 hãy nhập 12/25");
            thoiHan.focus();
            event.preventDefault();
            return false;
        }
        const mmYY = thoiHan.value.trim();
        if (check(mmYY)) {
            alert("Thẻ đã hết hạn!");
            thoiHan.focus();
            event.preventDefault();
            return false;
        }
        // Validate CVV (3 digits)
        const cvvRegex = /^[0-9]{3}$/;
        if (!cvvRegex.test(cvv.value.trim())) {
            alert("Mã CVV/CVC không hợp lệ! Vui lòng nhập 3 chữ số.");
            cvv.focus();
            event.preventDefault();
            return false;
        }
    }
    function check(mmYY) {
        const [month, year] = mmYY.split("/").map(Number);
        const expirationDate = new Date(2000 + year, month - 1); 
        const currentDate = new Date();
    
        if (
            expirationDate.getFullYear() < currentDate.getFullYear() ||
            (expirationDate.getFullYear() === currentDate.getFullYear() &&
                expirationDate.getMonth() < currentDate.getMonth())
        ) {
            return true; 
        }
        return false; 
    }
    
    
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let dis = JSON.parse(localStorage.getItem("discnt"));
    let addr = JSON.parse(localStorage.getItem("currentUser")) || [];
    let sum = JSON.parse(localStorage.getItem("total")) || 0;
    // Prepare the order object, overwriting customer info  
    const orderData = {
        orderID: generateOrderID(),
        customerInfo: {
            customerID: infUser.ID,
            name: name.value.trim()||infUser.name,
            phone: phone.value.trim()||infUser.phone,
            address: otherAdr ? adr.value.trim() : addr.address,
            paymentMethod: payCard ? "Thẻ" : "Khác",
            cardInfo: payCard ? {
                cardNumber: soThe.value.trim(),
                expirationDate: thoiHan.value.trim(),
                cvv: cvv.value.trim(),
            } : null
        },
        discount: dis,
        orderDate: formattedTime,
        items: JSON.parse(localStorage.getItem("cart" + IDUser)) || [],
        total: sum,
        orderStatus: orderStatus.pending,
    };

    localStorage.setItem("discnt", 0);
    // Save the order and cart together
    saveOrder(orderData);

    // Clear cart after order
    localStorage.removeItem("cart" + IDUser);

    // Redirect to the order summary page
    window.location.href = "orderSummary.html";
  return true;
}

// Save both cart and order together
function saveOrder(data) {
  const orders = JSON.parse(localStorage.getItem("orders" + IDUser)) || [];
  orders.push(data); // Add new order to existing orders
  localStorage.setItem("orders" + IDUser, JSON.stringify(orders));
}

// Add event listener for the confirm button
document.querySelector(".confirm-btn").addEventListener("click", (e) => {
  if (!validateForm(e)) {
    e.preventDefault();
  }
});
function autoClickButton() {
  setTimeout(() => {
    if (!isConfirmed) {
      document.getElementById("ck").click();
    }
  }, 5000);
}

function generateOrderID() {
  const orderKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("orders#")
  );

  let orderIDs = [];

  orderKeys.forEach((key) => {
    const orders = JSON.parse(localStorage.getItem(key)); 
    orders.forEach((order) => {
      if (order.orderID) {
        const orderNumber = parseInt(order.orderID.split("#DH")[1]);
        if (!isNaN(orderNumber)) {
          orderIDs.push(orderNumber); 
        }
      }
    });
  });

  if (orderIDs.length === 0) {
    return `#DH00001`;
  }

  const maxOrderID = Math.max(...orderIDs);
  const nextOrderID = (maxOrderID + 1).toString().padStart(5, "0");
  return `#DH${nextOrderID}`;
}
