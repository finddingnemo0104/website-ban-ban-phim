// Customer class
class Customer {
  constructor(ID, name, gender, email, phone, dob, address, status, password, role = listRole.customer) {
    this.ID = ID;
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.dob = dob;
    this.address = address;
    this.status = status;
    this.password = password;
    this.role = role;
  }
}

const listGender = {
  nam: "Nam",
  nu: "Nữ",
  khac: "Khác"
};

const listRole = {
  admin: "admin",
  customer: "customer"
}

const listCustomer = [];

listCustomer.push(
  new Customer(
    "",
    "Admin1",
    listGender.khac,  
    "admin1@example.com",
    "0869043004",
    new Date("1990-02-15"),
    "123 Lê Lợi, Quận 1, Thành phố Hồ Chí Minh",
    true,
    "admin",
    listRole.admin
  )
);

listCustomer.push(
  new Customer(
    "",
    "Admin",
    listGender.khac,
    "admin@example.com",
    "0",
    new Date("1990-02-15"),
    "",
    true,
    "admin",
    listRole.admin
  )
);

listCustomer.push(
  new Customer(
    "#KH00001",
    "Nguyễn Minh Tuấn",
    listGender.nam,
    "nguyenminhtuan@example.com",
    "0912345678",
    new Date("1990-02-15"),
    "",
    true,
    "123",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00002",
    "Trần Thị Hương",
    listGender.nu,
    "tranthihuong@example.com",
    "0987654321",
    new Date("1995-06-24"),
    "456 Nguyễn Trãi, Quận 5, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00003",
    "Lê Hoàng Khôi",
    listGender.nam,
    "lehoangkhoi@example.com",
    "0922334455",
    new Date("1988-11-09"),
    "789 Phan Đình Phùng, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00004",
    "Phạm Ngọc Bích",
    listGender.nu,
    "phamngocbich@example.com",
    "0933221144",
    new Date("1992-03-10"),
    "321 Điện Biên Phủ, Quận 3, Thành phố Hồ Chí Minh",
    true,
  
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00005",
    "Hoàng Văn Nam",
    listGender.nam,
    "hoangvannam@example.com",
    "0944556677",
    new Date("1985-07-19"),
    "654 Lý Thường Kiệt, Quận 10, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00006",
    "Vũ Thị Mai",
    listGender.nu,
    "vuthimai@example.com",
    "0955667788",
    new Date("1997-12-22"),
    "876 Hai Bà Trưng, Quận 1, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00007",
    "Đỗ Thanh Hùng",
    listGender.nam,
    "dothanhhung@example.com",
    "0911778899",
    new Date("1991-09-30"),
    "159 Võ Văn Tần, Quận 3, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00008",
    "Bùi Thị Lan",
    listGender.nu,
    "buithilan@example.com",
    "0977889966",
    new Date("1993-01-25"),
    "742 Cách Mạng Tháng 8, Quận Tân Bình, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00009",
    "Nguyễn Quang Hải",
    listGender.nam,
    "nguyenquanghai@example.com",
    "0902445566",
    new Date("1986-05-11"),
    "963 Nguyễn Văn Cừ, Quận 5, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

listCustomer.push(
  new Customer(
    "#KH00010",
    "Trần Anh Thư",
    listGender.nu,
    "trananhthu@example.com",
    "0988112233",
    new Date("1998-04-07"),
    "684 Trường Chinh, Quận Tân Phú, Thành phố Hồ Chí Minh",
    true,
    "",
    listRole.customer
  )
);

if (!localStorage.getItem("customers")) {
  const serializedCustomers = JSON.stringify(listCustomer);
  localStorage.setItem("customers", serializedCustomers);
} else {
  console.log("Customer data already exists in localStorage.");
}