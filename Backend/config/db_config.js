require("dotenv").config()

const db_obj = {
    database: process.env.DB_NAME || "msu_alum_hoco",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PW,
    host: process.env.DB_HOST || "localhost"
}

module.exports = db_obj;