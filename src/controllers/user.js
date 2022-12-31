const {mysqlConnection}=require("../connection.js")
const bcrypt=require('bcrypt')
const validator=require("../validators/validator.js")



const createUser=(req,res)=>{
    if(req.body.name){
        if(!validator.isValidUserName(req.body.name)){
            return res.status(400).send({status:false,message:"Please provide valid name that only contain alphabets and spaces."})
        }
    }else{
        return res.status(400).send({status:false,message:"Please provide name in the request body."})
    }

    if(req.body.email){
        if(!validator.isValidEmail(req.body.email)){
            return res.status(400).send({status:false,message:"Please provide valid email."})
        }   
    }else{
        return res.status(400).send({status:false,message:"Please provide email in the request body."})
    }

    if(req.body.password){
        if(!validator.isValidPassword(req.body.password)){
            return res.status(400).send({status:false,message:"Please provide valid Password in string with no spaces and Min 8 Charecters and Max 12 charecters."})
        }
        req.body.password=bcrypt.hashSync(req.body.password,10);
    }else{
        return res.status(400).send({status:false,message:"Please provide valid Password in the request body."})
    }

    let query=`INSERT INTO users (name, email, password) VALUES (?, ?, ?);`;
    mysqlConnection.query(query,[req.body.name ,req.body.email ,req.body.password],(error,result,field)=>{
        if(error){
            if(error.code=='ER_DUP_ENTRY'){
                return res.status(400).send({status:false,message:"Please provide unique email in the request body.",data:result})
            }
        }else{
            return res.status(201).send({status:true,message:"Row inserted successfully",data:result})
        }
    })

}

const loginUser=(req,res)=>{
    if(req.body.email){
        if(!validator.isValidEmail(req.body.email)){
            return res.status(400).send({status:false,message:"Please provide valid email."})
        }   
    }else{
        return res.status(400).send({status:false,message:"Please provide email in the request body."})
    }

    if(req.body.password){
        if(!validator.isValidPassword(req.body.password)){
            return res.status(400).send({status:false,message:"Please provide valid Password in string with no spaces and Min 8 Charecters and Max 20 charecters."})
        }
    }else{
        return res.status(400).send({status:false,message:"Please provide valid Password in the request body."})
    }

    let query=`SELECT * FROM users WHERE email = (? );`;

    mysqlConnection.query(query,req.body.email,(error,result,field)=>{
        if(error){
            console.log(error)
        }else{
            let correct=bcrypt.compareSync(req.body.password,result[0].password)
            if(!correct){
                return res.status(401).send({status:false,message:"Password is wrong"})
            }else{
                return res.status(200).send({status:true,message:"successfully Logedin"})
            }
        }
    })



}


module.exports={createUser,loginUser}