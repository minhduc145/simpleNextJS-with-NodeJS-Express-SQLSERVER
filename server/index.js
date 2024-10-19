const { SinhVien, ErrorDetail } = require("./SinhVienModel.js");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;
const cors = require("cors");
const SinhVienDAO = require("./SinhVienDAO");
const svdao = new SinhVienDAO();
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
  var rs = svdao
    .GetAllSV()
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});
app.get("/SinhVien/:id", function (req, res) {
  var rs = svdao
    .GetSV(req.params.id)
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});
app.patch("/SinhVien/update/:id", function (req, res) {
  const sv = new SinhVien(
    req.params.id,
    req.body.fname || null,
    req.body.orient,
    req.body.bdate
  );
  var rs = svdao
    .UpdateSV(req.params.id, sv)
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(token);
    });
});
app.delete("/SinhVien/deleteAll", function (req, res) {
  var rs = svdao
    .deleteAll()
    .then((token) => {
      res.send(token);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.delete("/SinhVien/delete/:id", function (req, res) {
  var rs = svdao
    .deleteSV(req.params.id)
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

  svdao.addSV(sv).then((rs) => {
    res.send(rs);
  });
});
