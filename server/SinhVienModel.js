class SinhVien {
  constructor(id, name, gender, bdate) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.bdate = bdate;
  }
}
class ErrorDetail {
  constructor(code, message, anyRows) {
    this.code = code;
    this.message = message;
    this.anyRows = anyRows;
  }
}
module.exports = { SinhVien, ErrorDetail };
