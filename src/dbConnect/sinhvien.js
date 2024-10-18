const config = require("./dbConfig");
var sql = require("mssql");
var express = require("express");
var app = express();

app.listen(5000, function () {
  console.log("server is running at " + 5000);
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
async function getSV() {
  try {
    var pool = await sql.connect(config);
    let sv = await pool.request().query("Select * from sinhvien");
    return sv.recordset;
  } catch (error) {}
}
