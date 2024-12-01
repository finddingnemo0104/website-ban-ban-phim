export class Admin {
  constructor(name, password, role = "admin", status = true) {
    this.name = name;
    this.password = password;
    this.role = role;
    this.status = status;
  }
}

export function getAdmins() {
  if (!localStorage.getItem("admins")) {
    const listAdmin = [];
    listAdmin.push(new Admin("admin1", "123"));
    listAdmin.push(new Admin("admin2", "123"));
    const serializedCustomers = JSON.stringify(listAdmin);
    localStorage.setItem("admins", serializedCustomers);
  }
  return JSON.parse(localStorage.getItem("admins"));
}
