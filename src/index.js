const express = require("express")
const path = require("path")
const morgan = require("morgan")
const routes = require("./routes/routes.js")
const app = express()
const mongoose = require("mongoose")
const {mongoUri} = require("../dev.js")

//Connecting to DB
mongoose.connect(mongoUri, { useNewUrlParser: true })
    .then(data=>console.log("- Database Online -"))
    .catch(err=>console.log(err))

//middlewares
app.use(express.urlencoded({ extended: false }))//change to true
app.use(express.json())
app.use(morgan("dev"))

//static files
app.use(express.static(path.join(__dirname,"public")))

//routes
app.use("/", routes)

//server settings
app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"),()=>{console.log("- Server Online -")})