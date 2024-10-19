const { SinhVien, ErrorDetail } = require("./SinhVienModel.js");
const config = require("./dbConfig");
var sql = require("mssql");

class SinhVienDAO {
  constructor() {}
  async GetAllSV() {
    try {
      var pool = await sql.connect(config);
      let sv = await pool.request().query("Select * from sinhvien");
      return sv.recordset;
    } catch (error) {
      return error;
    }
  }
  async GetSV(id) {
    try {
      var pool = await sql.connect(config);
      let sv = await pool
        .request()
        .input("msv", id)
        .query("Select * from sinhvien where MaSinhVien = @msv");
      return sv.recordset;
    } catch (error) {
      return error;
    }
  }
  async UpdateSV(id, SinhVien) {
    try {
      var pool = await sql.connect(config);
      let sv = await pool
        .request()
        .input("msv", id)
        .input("fname", SinhVien.name)
        .input("gtn", SinhVien.gender)
        .input("bd", SinhVien.bdate)
        .query(
          "update SinhVien set HoTen = @fname, GioiTinhNam = @gtn, NgaySinh = @bd where masinhvien = @msv"
        );
      return new ErrorDetail(1, sv.output, sv.rowsAffected);
    } catch (error) {
      return new ErrorDetail(0, error.message, 0);
    }
  }
  async deleteAll() {
    try {
      var pool = await sql.connect(config);
      let sv = await pool.request().query("delete from sinhvien");
      return sv.rowsAffected;
    } catch (error) {
      return error;
    }
  }
  async deleteSV(id) {
    try {
      var pool = await sql.connect(config);
      let sv = await pool
        .request()
        .input("msv", id)
        .query("delete from sinhvien where masinhvien = @msv");
      return "1";
    } catch (error) {
      return error;
    }
  }
  async addSV(SinhVien) {
    try {
      if (!SinhVien.id) SinhVien.id = null;
      if (!SinhVien.name) SinhVien.name = null;
      var pool = await sql.connect(config);
      let sv = await pool
        .request()
        .input("MaSinhVien", SinhVien.id || null)
        .input("HoTen", SinhVien.name || null)
        .input("GioiTinhNam", SinhVien.gender)
        .input("NgaySinh", SinhVien.bdate)
        .query(
          "insert into SinhVien values(@MaSinhVien,@HoTen,@GioiTinhNam,@NgaySinh)"
        );
      return new ErrorDetail(1, sv.output, sv.rowsAffected);
    } catch (error) {
      return new ErrorDetail(0, error.message, 0);
    }
  }
}
module.exports = SinhVienDAO;
