const express = require("express")
const path = require("path")
const routes = require("./routes/routes.js")
const app = express()
const mongoose = require("mongoose")
const {mongoUri} = require("../dev.js")

//Connecting to DB
mongoose.connect("mongodb+srv://nicetwice:nice123@cluster0-mvptq.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
    .then(data=>console.log("- Database Online -"))
    .catch(err=>console.log(err))

//middlewares
app.use(express.urlencoded({ extended: false }))//change to true
app.use(express.json())

//static files
app.use(express.static(path.join(__dirname,"public")))

//routes
app.use("/", routes)

//server settings
app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"),()=>{console.log("- Server Online -")})