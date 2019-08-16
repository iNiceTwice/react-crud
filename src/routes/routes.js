const express = require("express")
const router = express.Router()
const Products = require("../models/products")

let onlyNumbers = /^[1-9]\d*(?:\.\d+)?(?:[kmbt])?$/g

// adding products
router.post("/api/add", async (req,res)=>{ 
    const product = new Products(req.body)
    await product.save((err) => {
        if (!err) {
            console.log({
                status: "201",
                message: "Successfull upload"
            })
        } else {
            if (!onlyNumbers.test(req.body.price)){
                res.status(400).send({
                    status: "400",
                    message: "Bad request, make sure you put only numbers there."
                })
            } 
        }
    })
    res.send(product)
})
router.get("/api/products", async (req,res)=>{
    const products = await Products.find((err) => {
        if (!err) {
            console.log({
                status: "200",
                message: "Request accepted"
            })
        } else {
            console.log(err)
        }
    })
    res.send(products)
})
router.delete("/api/delete/:id", async (req,res)=>{
    const {id} = req.params
    const products = await Products.deleteOne({_id:id},
        (err) => {
            if (!err) {
                console.log({
                    status: "200",
                    message: "Successful deleted"
                })
            } else {
                console.log(err)
            }
        })
    res.send(products)
})
router.put("/api/products/edit/:id",async (req,res)=>{
    const products = await Products.updateOne(
        {
            "_id":req.params.id     //id indicate which product must change
        },
        {
            "name": req.body.name,  //params to replace
            "price": req.body.price
        },(err)=>{
            if(!err){
                console.log({
                    status:"201",
                    message:"Successful update"
                })
            }else{
                console.log(err)
            }  
        })
      res.send(products)
})
module.exports = router