const { SinhVien, ErrorDetail } = require("./SinhVienModel.js");
const config = require("./dbConfig");
var sql = require("mssql");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

class SinhVienDAO {
  constructor() {}
  async GetSV() {
    try {
      var pool = await sql.connect(config);
      let sv = await pool.request().query("Select * from sinhvien");
      return sv.recordset;
    } catch (error) {
      return error;
    }
  }
  async deleteAllSV() {
    try {
      var pool = await sql.connect(config);
      let sv = await pool.request().query("delete from sinhvien");
      return sv.recordset;
    } catch (error) {}
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
      if (!SinhVien.fname) SinhVien.fname = null;
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
