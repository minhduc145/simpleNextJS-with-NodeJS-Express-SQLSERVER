class SinhVien {
  constructor(id, name, gender, bdate) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.bdate = bdate;
  }
}
class ErrorDetail {
  constructor(code, msg, anyRows) {
    this.code = code;
    this.msg = msg;
    this.anyRows = anyRows;
  }
}
module.exports = { SinhVien, ErrorDetail };
