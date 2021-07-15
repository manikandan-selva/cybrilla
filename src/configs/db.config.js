if (!/prod/.test(process.env.NODE_ENV)) {
  require("dotenv/config");
}

module.exports = {
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

