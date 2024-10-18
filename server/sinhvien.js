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
async function getSV() {
  try {
    var pool = await sql.connect(config);
    let sv = await pool.request().query("Select * from sinhvien");
    return sv.recordset;
  } catch (error) {}
}
app.get("/SinhVien", function (req, res) {
  var rs = getSV()
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});

app.post("/SinhVien/create", (req, res) => {
  console.log(req.body);
  res.json({
    code: "1",
    message: "ok",
  });
});
