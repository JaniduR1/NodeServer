require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT;
const mongoose = require('./src/config/database.js')

mongoose.connection.on("connected", function () {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})

mongoose.connection.on("error", function (err) {
    console.log(`Mongoose connection error `, err)
    process.exit(1);
})
