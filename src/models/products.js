const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    created_at:{ type: Date, default: Date.now }
})

module.exports = mongoose.model("productos-React", productSchema)