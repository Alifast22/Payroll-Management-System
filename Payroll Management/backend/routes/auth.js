var express = require('express');
var router = express.Router();
const mysql=require('mysql2')
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const db=mysql.createPool({
    host: "localhost",
    user:"root",
    password:"ali22",
    database:"payroll",
  });
router.post("/login",(req,res)=>{
    console.log("OK2")
    const username=req.body.username
    const password=req.body.password  
    db.query(
        "Select * from employee where username=? and password=?",
        [username,password],
        (err,result) => {
            if(err)
            {
                res.send({err: err});
            }
            if(result.length>0)
            {
                console.log(result);
                res.send(result)
            }
            else{
                res.send({err:err});
            }
        }
    );

});

router.post("/loginadmin",(req,res)=>{
    console.log("OK2")
    const username=req.body.username
    const password=req.body.password  
    db.query(
        "Select * from admininfo where Adminusername=? and Adminpassword=?",
        [username,password],
        (err,result) => {
            if(err)
            {
                res.send({err: err});
            }
            if(result.length>0)
            {
                console.log(result);
                res.send(result)
            }
            else{
                res.send({err:err});
            }
        }
    );

});


module.exports = router;