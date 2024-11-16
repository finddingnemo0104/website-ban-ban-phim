// Toggling address input visibility
function showadr() {
    document.getElementById('address-input').style.display = 'block';
}

function hideadr() {
    document.getElementById('address-input').style.display = 'none';
}

// Toggling card input visibility
function showCard() {
    document.getElementById('the').style.display = 'block';
    document.getElementById('tg').style.display = 'block';
    document.getElementById('cvv').style.display = 'block';
}

function hideCard() {
    document.getElementById('the').style.display = 'none';
    document.getElementById('tg').style.display = 'none';
    document.getElementById('cvv').style.display = 'none';
}

// Close modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});
function validateForm(event) {
    const name = document.getElementById("hoTen");
    const phone = document.getElementById("SDT");
    const otherAdr = document.getElementById("other-address").checked;
    const adr = document.getElementById("address-input");
    const payCard = document.getElementById("PayByCard").checked;
    const soThe = document.getElementById("the");
    const thoiHan = document.getElementById("tg");
    const cvv = document.getElementById("cvv");

    // Validate name
    if (name.value.trim() === "") {
        alert("Họ tên không được để trống!");
        name.focus();
        event.preventDefault();
        return false;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (phone.value.trim() === "" || !phoneRegex.test(phone.value.trim())) {
        alert("SĐT không hợp lệ! Vui lòng nhập 10 chữ số.");
        phone.focus();
        event.preventDefault();
        return false;
    }

    // Validate address if "Nhập địa chỉ khác" is selected
    if (adr.value.trim() === "" && otherAdr) {
        alert("Vui lòng nhập địa chỉ!");
        adr.focus();
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

        // Validate CVV (3 digits)
        const cvvRegex = /^[0-9]{3}$/;
        if (!cvvRegex.test(cvv.value.trim())) {
            alert("Mã CVV/CVC không hợp lệ! Vui lòng nhập 3 chữ số.");
            cvv.focus();
            event.preventDefault();
            return false;
        }
    }
    saveToLocalStorage({
        hoTen: name.value.trim(),
        SDT: phone.value.trim(),
        address: otherAdr ? adr.value.trim() : "Địa chỉ mặc định",
        paymentMethod: payCard ? "Thẻ" : "Khác",
        cardNumber: payCard ? soThe.value.trim() : "",
        expirationDate: payCard ? thoiHan.value.trim() : "",
        cvv: payCard ? cvv.value.trim() : ""
    });
    window.location.href = "orderSummary.html";
    return true;
}


document.querySelector('.confirm-btn').addEventListener('click', (e) => {
    if (!validateForm()) {
        e.preventDefault();
    }
});


function saveToLocalStorage(data) {
    // Convert the data object to a JSON string and save to localStorage
    localStorage.setItem("infomation", JSON.stringify(data));
}