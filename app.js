var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session')
var mysql = require('mysql')
var app = express();



app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/setSomething', function(req, res, next) {
  req.session.name = 'John Smith'
  res.send('ahh');
});



app.get('/getSomething', function(req, res, next) {
  res.send('hello' + req.session.name);
});



app.post('/login',function(req,res){
	var user_name=req.body.username;
	console.log("User name = "+user_name);
	res.send("1");
});


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


app.post('/login',function(req,res){

	var username=req.body.username; //get the username

        var password = req.body.password; // get the password

    

	console.log("User name = "+username);

	console.log("Password = "+password);

	

     // connect to the db

    var mysql = require('mysql')

    var connection = mysql.createConnection({

      host     : 'localhost',

      user     : 'root',

      password : '',

      database : 'test'

    });



    connection.connect()



    var sql = "SELECT * from users where username = '"+username+"' and password = '"+password+"' LIMIT 1;";

    console.log(sql);



    connection.query(sql, function (err, rows, fields) {

      if (err) throw err

      

      for(var i=0; i< rows.length; i++){

          // we can only ever send back ONE res.send(). This is the response that will be sent back to the user.

          // in this case, we are sending back the account type to the JavaScript that called this piece of codePointAt

          // to make sure that we will send them to the correct page.

           res.send(rows[i].acctype) // send it back to the caller

           

      }

    })



connection.end()



    

    

   

});


module.exports = app;
