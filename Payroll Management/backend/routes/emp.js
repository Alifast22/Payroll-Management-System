var express = require('express');
var router = express.Router();
var generator = require('generate-password')
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
  const select="select * from employee"
  db.query(select,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.get("/noofemp",(req,res)=>{
  const select="select count(*) as count from employee"
  db.query(select,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.get("/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="select * from employee where idEmployee=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.post("/insert",(req,res)=>{
  const emp_name=req.body.employee_name;
  const hourly_pay=req.body.hourly_pay;
  const post=req.body.post;
  const username="Comp"+emp_name;
  const password=generator.generate({
    length:6,
    numbers:true
  });

  const insert="INSERT INTO EMPLOYEE (EMPLOYEE_NAME,HOURLY_PAY,POST,USERNAME,PASSWORD) VALUES (?,?,?,?,?);"
  db.query(insert,[emp_name,hourly_pay,post,username,password],(err,result)=>{
 
    res.send(result);
  })
})


router.delete("/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="delete from employee where idEmployee=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.put("/:id",(req,res)=>{
  const id=req.params.id;
  console.log(id,req.body.post)
  sqlupd="update employee set hourly_pay=?,post=? where idEmployee=?";
  db.query(sqlupd,[req.body.hourly_pay,req.body.post,id],(err,result)=>{
      console.log(err);
      console.log(result);
      res.send(result)
    })
})

//get attendance for a specific employee
router.get("/:id/getatt",(req,res)=>{
  const empid=req.params.id;
  const select="select * from attendance where idEmployee=? union select idabsentees,date,null,null,null,null,idEmployee from absentees where idEmployee=?";
  db.query(select,[empid,empid],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

//get projects for a specific employee
router.get("/:id/getprojs",(req,res)=>{
  const empid=req.params.id;
  console.log(empid);
  const select="select * from projects where idEmployee=?";
  db.query(select,empid,(err,result)=>{
    console.log(err);

    console.log(result);
    res.send(result)
  })
})

//get payments for a specific employee
router.get("/:id/getpayments",(req,res)=>{
  const empid=req.params.id;
  console.log(empid);
  const select="select p.*,a.date,a.enter_time,a.idEmployee from payments p,attendance a  where p.idAttendance=a.idAttendance and a.idEmployee=?";
  db.query(select,empid,(err,result)=>{
    console.log(err);

    console.log(result);
    res.send(result)
  })
})





module.exports = router;
