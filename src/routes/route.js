const express = require('express')
const router = express.Router()
const {mysqlConnection}=require('../connection.js')
const userController=require("../controllers/user.js")

router.post("/user/create",userController.createUser)
router.post("/user/login",userController.loginUser)



router.get("/person",(req,res)=>{

    mysqlConnection.query("SELECT * from people",(err,row,field)=>{
        if(!err){
            res.status(200).send({rows:row,columns:field})
        }else{
            console.log(err)
        }

    })
})

router.all("/testme", (req, res) => 
{ console.log(req.params.productId)
    return res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

module.exports = router;
