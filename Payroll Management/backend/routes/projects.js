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

router.get("/notpickedget",(req,res)=>{
  const select="select idprojects,project_name,project_pay from projects where project_status='NotPicked'"
  db.query(select,async (err,result)=>{
    console.log(err);
    console.log(result);

    res.send(result)
  })
})

router.get("/",(req,res)=>{
  const select="select * from projects"
  db.query(select,async (err,result)=>{
    console.log(err);
    console.log(result);

    res.send(result)
  })
})

router.get("/:project_name",(req,res)=>{
  const project_name=req.params.project_name;
  const select="select idprojects from projects where project_name=?"
  db.query(select,[project_name],async (err,result)=>{
    console.log(err);
    console.log(result);

    res.send(result)
  })
})


router.post("/insert",(req,res)=>{
  const project_name=req.body.project_name;
  const project_status=req.body.project_status;
  const project_pay=req.body.project_pay;
  const Description=req.body.Description


  const insert="INSERT INTO projects (project_name,project_status,project_pay,Description) VALUES (?,?,?,?);"
  db.query(insert,[project_name,project_status,project_pay,Description],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.put("/picked/:id",(req,res)=>{
    const projectid=req.params.id;


    sqlupd="update projects set idEmployee=?,project_status='Picked' where idprojects=?";
    db.query(sqlupd,[req.body.idEmployee,projectid],(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
      })

})

router.put("/changestatus/:id",(req,res)=>{
  const projectid=req.params.id;
  const status=req.body.status //completed or in progress
  console.log(projectid)
  sqlupd="update projects set project_status=? where idprojects=?";
  db.query(sqlupd,[status,projectid],(err,result)=>{
      console.log(err);
      console.log(result);
      res.send(result)
    })

})


router.delete("/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="delete from projects where idprojects=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.put("/:id",(req,res)=>{
  const id=req.params.id;
  sqlupd="update projects set project_pay=? where idpayments=?";
    db.query(sqlupd,[req.body.project_pay,id],(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
      })
  
})


module.exports = router;
