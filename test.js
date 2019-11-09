var express = require('express');
var port = 4000;
var app = express();
app.listen(port, function(){
    console.log("Server listening");

})
app.get('/', function(req, res){
    res.send("Ok Root working");
})

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');
var student;
db.serialize(function(){
    db.run('create table students (first_name TEXT, last_name text, age int)');
    db.run('insert into students values("maruf","hossen",20)');
    db.run('insert into students values("Hasan","hossen",2020)');
    db.run('insert into students values("Hasib","hossen",20)');
    db.run('insert into students values("Johir","hossen",20)');
    db.run('insert into students values("Kamal","hossen",20)');
    db.run('insert into students values("Miraz","hossen",20)');
})

var first_name = "Hasan";
db.get('SELECT * FROM students WHERE first_name = ?', [first_name], function(err, row){
    if(err){
      console.log("ERROR: " + err.message);
    }
    else{
      console.log(row.age);
    }

  });
 

db.close();