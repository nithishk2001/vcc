const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 5000
app.use(cors({
    origin: "https://vcc-front.onrender.com", // Allow only this domain
    methods: "GET,POST,PUT,DELETE",           // Specify allowed methods
    credentials: true                         // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json())
app.use(require("./routes/record"))
const dbo = require("./db/conn")

app.get("/", function(req, res) {
    res.send("App is running")
})

dbo.connectToMongoDB(function (error) {
    if (error) throw error

    app.listen(port, () => {
        console.log("Server is running on port: " + port)
    })
})
