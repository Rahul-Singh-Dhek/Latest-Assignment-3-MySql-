const mysql=require('mysql')

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"sqluser",
    password:"password",
    database:"firstdb", 
    mutipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("mySql is connected")
    }else{
        console.log(err);
    }
}) 

module.exports={mysqlConnection}