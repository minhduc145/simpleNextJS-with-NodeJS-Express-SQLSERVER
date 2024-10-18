var config = {
  server: "localhost",
  database: "SinhVien",
  port: 1433,
  user: "sa",
  password: "123",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true,
  },
};
module.exports = config;
