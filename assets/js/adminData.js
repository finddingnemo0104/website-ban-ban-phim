class Admin {
  constructor(ID, name, password, status = true, role = "admin") {
    this.ID = ID;
    this.name = name;
    this.password = password;
    this.status = status;
    this.role = role;
  }
}

const listAdmin = [];

listAdmin.push(new Admin("AD#00001", "admin1", "123"));

listAdmin.push(new Admin("AD#00002", "admin2", "123"));

function getAdmins() {
  if (
    localStorage.getItem("admins") === null ||
    JSON.parse(localStorage.getItem("admins")).length === 0
  ) {
    localStorage.setItem("admins", JSON.stringify(listAdmin));
  }
  return JSON.parse(localStorage.getItem("admins"));
}

getAdmins();
