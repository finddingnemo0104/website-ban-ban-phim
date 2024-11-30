function randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateOrders(customers, products, orderCount, startDate, endDate) {
  const orders = [];

  for (let i = 0; i < orderCount; i++) {
    const orderID = `#DH${String(i + 1).padStart(5, "0")}`;
    let customer = randomElement(customers);
    while (customer.role === 'admin') {

    }
    const orderDate = randomDate(new Date(startDate), new Date(endDate));
    const orderItems = [];

    // Randomize the number of products per order
    const itemCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 items per order
    const chosenProducts = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, itemCount);

    let total = 0;
    for (const product of chosenProducts) {
      const quantity = Math.floor(Math.random() * 10) + 1; // Quantity between 1-10
      orderItems.push({
        ID: product.ID,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        quantity: quantity,
        description: product.description,
        image: product.image,
      });
      total += product.price * quantity;
    }

    orders.push({
      orderID: orderID,
      customerInfo: {
        customerID: customer.ID,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        paymentMethod: "Khác",
        cardInfo: null,
      },
      discount: null,
      orderDate: orderDate,
      items: orderItems,
      total: total,
      orderStatus: "Đã giao thành công",
    });
  }
  return orders;
}

function groupOrdersByCustomer(orders) {
    const groupedOrders = {};

    for (const order of orders) {
        const customerID = order.customerInfo.customerID;

        // Nếu chưa có mảng cho customerID này, khởi tạo mảng rỗng
        if (!groupedOrders[customerID]) {
            groupedOrders[customerID] = [];
        }

        // Thêm hóa đơn vào mảng tương ứng
        groupedOrders[customerID].push(order);
    }

    return groupedOrders;
}


function isExistOrder() {
  const orderKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("orders#")
  );
  return orderKeys.length !== 0;
}

// Get customers data from localStorage
function getCustomer() {
  if (
    localStorage.getItem("customers") === null ||
    JSON.parse(localStorage.getItem("customers")).length === 0
  ) {
    localStorage.setItem("customers", JSON.stringify(listCustomer));
  }
  return JSON.parse(localStorage.getItem("customers"));
}

function getProduct() {
  if (
    localStorage.getItem("products") === null ||
    JSON.parse(localStorage.getItem("products")).length === 0
  ) {
    localStorage.setItem("products", JSON.stringify(listProduct));
  }
  return JSON.parse(localStorage.getItem("products"));
}

if (!isExistOrder()) {
  const customers = getCustomer();
  const products = getProduct();
  const numberOrder = 100;
  const orders = generateOrders(customers, products, numberOrder, "2022-05-01", "2024-11-30");
  const groupedOrders = groupOrdersByCustomer(orders);
  for (const customerID in groupedOrders) {
    localStorage.setItem(`orders${customerID}`, JSON.stringify(groupedOrders[customerID]));
    console.log(`Đã lưu hóa đơn cho ${customerID} vào localStorage`);
}
}
