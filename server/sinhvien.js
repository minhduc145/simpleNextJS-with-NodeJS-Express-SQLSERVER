const config = require("./dbConfig");
var sql = require("mssql");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(port, function () {
  console.log("server is running at " + port);
});

app.get("/SinhVien", function (req, res) {
  var rs = getSV()
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});
app.get("/SinhVien/deleteAll", function (req, res) {
  var rs = deleteAllSV()
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});
app.delete("/SinhVien/delete/:id", function (req, res) {
  var rs = deleteSV(req.params.id)
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});

app.post("/SinhVien/create", (req, res) => {
  const sv = new SinhVien(
    req.body.id || null,
    req.body.fname || null,
    req.body.orient,
    req.body.bdate
  );

  addSV(sv).then((rs) => {
    res.json({
      code: rs.code,
      message: rs.msg,
      rowsAffected: rs.anyRows,
    });
  });
});
class ErrorDetail {
  constructor(code, msg, anyRows) {
    this.code = code;
    this.msg = msg;
    this.anyRows = anyRows;
  }
}
class SinhVien {
  constructor(id, name, gender, bdate) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.bdate = bdate;
  }
}
async function getSV() {
  try {
    var pool = await sql.connect(config);
    let sv = await pool.request().query("Select * from sinhvien");
    return sv.recordset;
  } catch (error) {
    return error;
  }
}
async function deleteAllSV() {
  try {
    var pool = await sql.connect(config);
    let sv = await pool.request().query("delete from sinhvien");
    return sv.recordset;
  } catch (error) {}
}
async function deleteSV(id) {
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
async function addSV(SinhVien) {
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
