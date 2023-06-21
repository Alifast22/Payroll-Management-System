const { Server } = require("socket.io");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors");
const mysql=require('mysql2')
const port=process.env.port || 3001;

const io = new Server({
  cors: {
      origin: "http://localhost:3000",
  },
});

io.on("connection",socket =>{
  console.log("From edb",socket.id)
 socket.on('sendNotification',(var1,var2)=>{

  socket.broadcast.emit("receiveNotification",var1,var2)
 })
})

io.listen(4000);

var indexRouter = require('./routes/index');
var empRouter = require('./routes/emp');
var attRouter=require('./routes/att');
var paymentsRouter=require('./routes/payments');
var projectsRouter=require('./routes/projects')
var payrollRouter=require('./routes/payroll')
var authrouter=require('./routes/auth')
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



//ROUTERS
 app.use('/', indexRouter);
 app.use('/emp', empRouter);
 app.use('/att',attRouter);
 app.use('/payments',paymentsRouter);
 app.use('/projects',projectsRouter);
 app.use('/notpickedget',projectsRouter);
 app.use('/projects/insert',projectsRouter);
 app.use('/projects/:project_name',projectsRouter);
 app.use('/payroll',payrollRouter);
 app.use('/auth',authrouter);


app.get('/testAPI',(req,res)=>{
  res.send([{total:500,attendance:60}]);
  
})


 // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, ()=>{
  console.log(`running server at ${port}`);
});


module.exports = app;
