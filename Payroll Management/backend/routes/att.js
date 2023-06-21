const e = require('express');
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


router.get("/",(req,res)=>{
  const select="select a.*,e.* from attendance a,employee e where a.idEmployee=e.idEmployee  union all select ab.idabsentees,date,null,null,null,null,ab.idEmployee,e.*  from absentees ab,employee e where ab.idEmployee=e.idEmployee;";
  
  db.query(select,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.get("/gettodayatt",(req,res)=>{
  const date=new Date().toLocaleDateString();

  
  select="select a.*,e.* from attendance a,employee e where a.idEmployee=e.idEmployee and a.date=? union all select ab.idabsentees,date,null,null,null,null,ab.idEmployee,e.*  from absentees ab,employee e where ab.idEmployee=e.idEmployee and ab.date=?;";
  
  db.query(select,[date,date],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
    
  })
  
})

router.get("/todayabsent",(req,res)=>{
  console.log(new Date().toLocaleDateString())
  const select="select * from employee where idEmployee not in (select e.idEmployee from attendance a,employee e where a.idEmployee=e.idEmployee and a.date=?)";
  
  db.query(select,[new Date().toLocaleDateString()],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.post("/markabsent",(req,res)=>{
  console.log(new Date().toLocaleDateString())
  request(`http://localhost:3001/att/todayabsent`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        body.forEach(element => {
          console.log(element.idEmployee)
          const insert="INSERT INTO absentees (date,idEmployee) VALUES (?,?);"
          db.query(insert,[new Date().toLocaleDateString(),element.idEmployee],(err,result)=>{
            console.log(err);
            console.log(result);
           // res.send("Attendance Added to database")
        });
      });
 
    })
    res.send("Attendance Added to database")
})

router.post("/insert",(req,res)=>{
  let ontime=null;
  let {date,present,enter_time,exit_time,id}=req.body;
  if (present=='A') {enter_time=null;exit_time=null;} //present P absent A
  if (present=='P') {
    if (enter_time>'10:00:00 AM') ontime='F';
    else ontime='T';
  } // >10am==late. T=true F=false
  const insert="INSERT INTO attendance (date,present,enter_time,exit_time,ontime,idEmployee) VALUES (?,?,?,?,?,?);"
  db.query(insert,[date,present,enter_time,exit_time,ontime,id],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
 })
 
})


router.delete("/attabs/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="delete from absentees where idabsentees=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})


router.delete("/:id",(req,res)=>{
  const id=req.params.id;
  const sqldel="delete from attendance where idattendance=?";
  db.query(sqldel,id,(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

router.put("/updateabs/:id",(req,res)=>{
  const id=req.params.id;
  const date=req.body.date
  const sqldel="Update absentees Set date=?  where idabsentees=?";
  db.query(sqldel,[date,id],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })  
})

router.put("/update/:id",(req,res)=>{
  const id=req.params.id;
  const et=req.body.enter_time
  const ex=req.body.exit_time
  const date=req.body.date
  const sqldel="Update attendance Set enter_time=?,exit_time=?,date=?  where idattendance=?";
  db.query(sqldel,[et,ex,date,id],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })  
})

router.put("/:id",(req,res)=>{
    const id=req.params.id;
    sqlupd="update attendance set date=? where idattendance=?";
    db.query(sqlupd,[req.body.date,id],(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result)
      })
})

router.put("/exit/:id",(req,res)=>{
  const id=req.params.id;
  const exit_time=req.body.exit_time
  sqlupd="update attendance set exit_time=? where idattendance=?";
  db.query(sqlupd,[exit_time,id],(err,result)=>{
      console.log(err);
      console.log(result);
      res.send(result)
    })
})


let output;
const setOutput=(rows)=>{
  return rows
}
router.get("/percentage/:id", (req,res)=>{
  sqlq="select * from attendance where idEmployee=?";
  
  db.query(sqlq,req.params.id,  (err,result)=>{
  output=setOutput(result);
  console.log(output.length)
  let countpresent=0;
  output.map((e)=>{
  if (e.present=='P') countpresent++;    
  })
  console.log(countpresent);
  res.send({
    percentage:countpresent/output.length*100
  })
})

})
router.get("/monthlyreport",(req,res)=>{  //number of presents in all months
    sqlq="select count(*) as count,format(date,'dd-mm-yyyy') as month from payroll.attendance where present='P' group by format(date,'dd-mm-yyyy')";
    
    

    
    //sqlquery="select count(*) as count,MONTH(date) as month from attendance where present='P' group by MONTH(date) ;";
    db.query(sqlq,(err,result)=>{
        console.log(err);

        res.send(result)
      })
})

//make function, traverse each val and then res.send late on time
router.get("/gettodayperc",(req,res)=>{
  
  let countpresent=0;
  let length=1;
  request(`http://localhost:3001/att/gettodayatt`, { json: true }, (err, resa, body) => {
    if (err) { return console.log(err); }
    console.log(body.length)
    length=body.length
    console.log(`body:${body}`)
    body.forEach(element => {
    if (element.present=='P') countpresent++;
    
  })
  res.send({percentage:countpresent/length*100});
})
})

router.get("/getontime",(req,res)=>{
  console.log(new Date().toLocaleDateString())
  const select="select count(*) as count,ontime from attendance where date=? group by ontime";
  
  db.query(select,[new Date().toLocaleDateString()],(err,result)=>{
    console.log(err);
    console.log(result);
    res.send(result)
  })
})

module.exports = router;
