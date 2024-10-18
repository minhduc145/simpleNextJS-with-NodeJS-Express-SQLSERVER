const config = require("./dbConfig");
var sql = require("mssql");
var express = require("express");
const { TimeoutError } = require("tarn");
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
app.post("/user/create", function (req, res) {
  const { id, fname, orient, bdate } = req.query;
  console.log(req.query);
});
async function getSV() {
  try {
    var pool = await sql.connect(config);
    let sv = await pool.request().query("Select * from sinhvien");
    return sv.recordset;
  } catch (error) {}
}
