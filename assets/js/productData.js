// Product class
class Product {
  constructor(ID, name, category, brand, price, quantity, description, image) {
    this.ID = ID;
    this.name = name;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.image = image;
  }
}

const listCategory = {
  co: "Bàn phím cơ",
  gaming: "Bàn phím gaming",
  khongday: "Bàn phím không dây",
  doixung: "Bàn phím đối xứng",
  mini: "Bàn phím mini"
};

const listProduct = [];

listProduct.push(
  new Product(
    "SP00001",
    "Keychron K6",
    listCategory.co,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ 65% với 68 phím, sử dụng switch Gateron (Blue/Brown/Red), hỗ trợ kết nối không dây và có dây. Thiết kế nhỏ gọn, phù hợp cho người làm việc và chơi game.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);

listProduct.push(
  new Product(
    "SP00002",
    "Corsair K70 RGB MK.2",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00003",
    "Razer BlackWidow V3",
    listCategory.gaming,
    "Razer",
    "2900000",
    50,
    `Bàn phím gaming cơ học với switch Razer Green, mang lại cảm giác gõ clicky, nhanh và chính xác. Có đèn RGB Razer Chroma và thiết kế tối ưu cho game thủ.`,
    "/assets/Image/quan-ly-san-pham/Razer-BlackWidow-V3.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00004",
    "SteelSeries Apex Pro",
    listCategory.gaming,
    "SteelSeries",
    "4800000",
    50,
    `Bàn phím gaming cao cấp với switch OmniPoint điều chỉnh độ nhạy từng phím, đèn RGB từng phím và khung nhôm. Được thiết kế cho trải nghiệm chơi game chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/SteelSeries-Apex-Pro.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00005",
    "Anne Pro 2",
    listCategory.mini,
    "Obinslab",
    "2200000",
    50,
    `Bàn phím 60% không dây với 61 phím, sử dụng switch Gateron hoặc Kailh. Hỗ trợ kết nối Bluetooth, có đèn LED RGB và phần mềm tùy chỉnh keymap. Phù hợp với không gian làm việc nhỏ.`,
    "/assets/Image/quan-ly-san-pham/Anne-Pro-2.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00006",
    "Ducky One 2 Mini",
    listCategory.mini,
    "Ducky",
    "2800000",
    50,
    `Bàn phím cơ 60% với 61 phím, sử dụng switch Cherry MX, có đèn LED RGB, thiết kế đơn giản nhưng tinh tế. Lý tưởng cho những người cần sự nhỏ gọn và tính di động cao.`,
    "/assets/Image/quan-ly-san-pham/Ducky-One-2-Mini.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00007",
    "Logitech MX Keys",
    listCategory.khongday,
    "Logitech",
    "2000000",
    50,
    `Bàn phím không dây full-size, sử dụng kết nối Bluetooth hoặc USB receiver. Phím thấp và mượt, phù hợp cho công việc văn phòng và người làm việc từ xa. Hỗ trợ đa thiết bị.`,
    "/assets/Image/quan-ly-san-pham/Logitech-MX-Keys.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00008",
    "Keychron K2 (Version 2)",
    listCategory.khongday,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ không dây với 84 phím, hỗ trợ kết nối Bluetooth và có dây. Tùy chọn switch Gateron và LED RGB. Thích hợp cho công việc và chơi game nhẹ.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00009",
    "Kinesis Freestyle2",
    listCategory.doixung,
    "Kinesis",
    "3500000",
    50,
    `Bàn phím tách rời, có thể điều chỉnh khoảng cách giữa các phím để phù hợp với từng người dùng. Giúp giảm căng thẳng lên vai và cổ tay, thích hợp cho người làm việc văn phòng.`,
    "/assets/Image/quan-ly-san-pham/Kinesis-Freestyle2.jpg"
  )
);
listProduct.push(
  new Product(
    "SP00010",
    "ErgoDox EZ",
    listCategory.doixung,
    "ErgoDox",
    "5200000",
    50,
    `Bàn phím cơ học tách rời, có thể điều chỉnh linh hoạt vị trí của hai phần bàn phím để tối ưu hóa tư thế gõ, giúp giảm căng thẳng cho cổ tay và vai. Hỗ trợ tùy biến keymap qua phần mềm, có đèn LED RGB và các tùy chọn switch khác nhau.`,
    "/assets/Image/quan-ly-san-pham/ErgoDox-EZ.jpg"
  )
);

listProduct.push(
  new Product(
    "SP000011",
    "Corsair K20 RGB MK.3",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);

listProduct.push(
  new Product(
    "#SP000012",
    "Keychron K6",
    listCategory.co,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ 65% với 68 phím, sử dụng switch Gateron (Blue/Brown/Red), hỗ trợ kết nối không dây và có dây. Thiết kế nhỏ gọn, phù hợp cho người làm việc và chơi game.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);

listProduct.push(
  new Product(
    "#SP000013",
    "Corsair K70 RGB MK.2",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000014",
    "Razer BlackWidow V3",
    listCategory.gaming,
    "Razer",
    "2900000",
    50,
    `Bàn phím gaming cơ học với switch Razer Green, mang lại cảm giác gõ clicky, nhanh và chính xác. Có đèn RGB Razer Chroma và thiết kế tối ưu cho game thủ.`,
    "/assets/Image/quan-ly-san-pham/Razer-BlackWidow-V3.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000015",
    "SteelSeries Apex Pro",
    listCategory.gaming,
    "SteelSeries",
    "4800000",
    50,
    `Bàn phím gaming cao cấp với switch OmniPoint điều chỉnh độ nhạy từng phím, đèn RGB từng phím và khung nhôm. Được thiết kế cho trải nghiệm chơi game chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/SteelSeries-Apex-Pro.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000016",
    "Anne Pro 2",
    listCategory.mini,
    "Obinslab",
    "2200000",
    50,
    `Bàn phím 60% không dây với 61 phím, sử dụng switch Gateron hoặc Kailh. Hỗ trợ kết nối Bluetooth, có đèn LED RGB và phần mềm tùy chỉnh keymap. Phù hợp với không gian làm việc nhỏ.`,
    "/assets/Image/quan-ly-san-pham/Anne-Pro-2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000017",
    "Ducky One 2 Mini",
    listCategory.mini,
    "Ducky",
    "2800000",
    50,
    `Bàn phím cơ 60% với 61 phím, sử dụng switch Cherry MX, có đèn LED RGB, thiết kế đơn giản nhưng tinh tế. Lý tưởng cho những người cần sự nhỏ gọn và tính di động cao.`,
    "/assets/Image/quan-ly-san-pham/Ducky-One-2-Mini.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000018",
    "Logitech MX Keys",
    listCategory.khongday,
    "Logitech",
    "2000000",
    50,
    `Bàn phím không dây full-size, sử dụng kết nối Bluetooth hoặc USB receiver. Phím thấp và mượt, phù hợp cho công việc văn phòng và người làm việc từ xa. Hỗ trợ đa thiết bị.`,
    "/assets/Image/quan-ly-san-pham/Logitech-MX-Keys.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000019",
    "Keychron K2 (Version 2)",
    listCategory.khongday,
    "Keychron",
    "2500000",
    50,
    `Bàn phím cơ không dây với 84 phím, hỗ trợ kết nối Bluetooth và có dây. Tùy chọn switch Gateron và LED RGB. Thích hợp cho công việc và chơi game nhẹ.`,
    "/assets/Image/quan-ly-san-pham/Keychron-K2-V2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP000020",
    "Kinesis Freestyle2",
    listCategory.doixung,
    "Kinesis",
    "3500000",
    50,
    `Bàn phím tách rời, có thể điều chỉnh khoảng cách giữa các phím để phù hợp với từng người dùng. Giúp giảm căng thẳng lên vai và cổ tay, thích hợp cho người làm việc văn phòng.`,
    "/assets/Image/quan-ly-san-pham/Kinesis-Freestyle2.jpg"
  )
);
listProduct.push(
  new Product(
    "#SP00021",
    "ErgoDox EZ",
    listCategory.doixung,
    "ErgoDox",
    "5200000",
    50,
    `Bàn phím cơ học tách rời, có thể điều chỉnh linh hoạt vị trí của hai phần bàn phím để tối ưu hóa tư thế gõ, giúp giảm căng thẳng cho cổ tay và vai. Hỗ trợ tùy biến keymap qua phần mềm, có đèn LED RGB và các tùy chọn switch khác nhau.`,
    "/assets/Image/quan-ly-san-pham/ErgoDox-EZ.jpg"
  )
);

listProduct.push(
  new Product(
    "#SP000022",
    "Corsair K20 RGB MK.3",
    listCategory.co,
    "Corsair",
    "3500000",
    50,
    `Bàn phím cơ full-size với switch Cherry MX (Red/Blue/Brown), có đèn RGB, khung nhôm chắc chắn, tích hợp các phím macro chuyên dụng. Phù hợp cho game thủ và người làm việc chuyên nghiệp.`,
    "/assets/Image/quan-ly-san-pham/corsair-K70-RGB-MK.2.jpg"
  )
);

