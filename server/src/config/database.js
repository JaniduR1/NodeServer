require("dotenv").config();
const mongoose = require('mongoose')
const conString = process.env.DB_URL;

mongoose.
connect(conString).
then(() => console.log("DB Active")).
catch((err) => console.error("DB Connection failed", err))


module.exports = mongoose;