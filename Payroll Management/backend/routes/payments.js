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

router.get("/",(req,res)=>{
  const select="select * from payments"
  db.query(select,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})
router.get("/allpayments",(req,res)=>{
  const select="select p.*,a.*,e.employee_name from payments p,attendance a,employee e  where p.idAttendance=a.idAttendance and a.idEmployee=e.idEmployee";
  db.query(select,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.post("/insert",(req,res)=>{
  const sal_deduc='late salary cut';
 const sal_deduc_amount=req.body.deduc_amount;
 const annual_bonus=1000;
 const paidon=req.body.paidon
 const att_id=req.body.id
 const insert="INSERT INTO payments (deduc_amount,idAttendance) VALUES (?,?);"
 db.query(insert,[sal_deduc_amount,att_id],(err,result)=>{
   console.log(err);
   console.log(result);
   res.send("Payment Added to database")
 })
})

router.delete("/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="delete from payments where idpayments=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.put("/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id,req.body.deduc_amount)
    sqlupd="update payments set deduc_amount=? where idpayments=?";
    db.query(sqlupd,[req.body.deduc_amount,id],(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
      })
})


module.exports = router;