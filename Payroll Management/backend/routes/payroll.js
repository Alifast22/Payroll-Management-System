var express = require('express');
var router = express.Router();
const mysql=require('mysql2')
const request=require('request')


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
let output;
const setOutput=(rows)=>{
  let myPromise=new Promise((res,rej)=>{
    res(rows)
  })
}
router.get("/",(req,res)=>{
  const select="select e.idEmployee,e.employee_name,p.deduc_amount from employee e,payments p where p.idEmployee=e.idEmployee";
  db.query(select,(err,result)=>{
    if (result){
    output=setOutput(result);
    output.forEach (e=>{
         request(`http://localhost:5000/att/percentage/${e.idEmployee}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log({...e,att_percentage:body.percentage})
        return({...e,att_percentage:body.percentage});
      });
    })}
   console.log(output);
   res.send(output);
   
  })
  
})



module.exports = router;
