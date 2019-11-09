var expressed = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('myDatabase.db');
var app = expressed();
app.use(bodyParser.urlencoded({ extended: true}));

var port = 3000;
app.listen(port, function(){
    console.log('Server is listening on port #'+ port);
})
var quotes;
db.serialize(function(){
db.run('drop table quotes');
db.run('create table quotes (id  int primery key, quote TEXT, author , year int)');
db.run('insert into quotes values (1,"Love is bliend", "unknown", 2012)');
db.run('insert into quotes values (2,"Theaf is bliend", "unknown", 2014)');
db.run('insert into quotes values (5,"Men is bliend", "unknown", 2013)');
db.run('insert into quotes values (6,"Cat is bliend", "unknown", 2010)');
db.run('insert into quotes values (3,"Dog is bliend", "unknown", 2010)');
db.run('insert into quotes values (9,"Home is bliend", "unknown", 2015)');
db.run('insert into quotes values (11,"Pen is bliend", "unknown", 2010)');
db.run('insert into quotes values (55,"Air is bliend", "unknown", 2010)');
db.run('insert into quotes values (45,"Earth is bliend", "unknown", 2016)');
db.run('insert into quotes values (52,"Home is bliend", "unknown", 2010)');
db.run('insert into quotes values (66,"Table is bliend", "unknown", 2010)');
db.run('insert into quotes values (11,"Lovers is bliend", "unknown", 2010)');
db.run('insert into quotes values (99,"Ant is bliend", "unknown", 2010)');
db.run('insert into quotes values (63,"Zom is bliend", "unknown", 2010)');
db.run('insert into quotes values (91,"Hut is bliend", "unknown", 2010)');
db.run('insert into quotes values (21,"Pond is bliend", "unknown", 2010)');
});

app.get('/', function(req, res){
    res.send("Get request received at '/'");
})
app.get('/quotes', function(req, res){
    if(req.query.year){
       //res.send("Return a list of quotes from the year: " + req.query.year);
        db.all('select * from quotes where year = ?', [req.query.year] , processReqest);
        function processReqest(err, rows){
            if(err)
                res.send("error :" + err);
            res.json(rows);
        }

      }
      else{
          db.all('select * from quotes', processReqest);
          function processReqest(err, rows){
            res.json(rows);
          }
          
      }
})
app.get('/quotes/:id', function(req,res){
    db.get('select * from quotes where id = ?', [req.params.id], function(err, rows){
        if(err)
            res.send("error");
        else
            res.json(rows);
    })
})
app.post('/quotes', function(req,res){
   // res.send('Added a new quotes' + req.body.quote);
   db.run('insert into quotes values(?, ?, ?,?)', [req.body.id,req.body.quote, req.body.author, req.body.year], function(err){
        if(err)
            res.send("failed to post" + err);
        else
            res.send("post operation sucssesful");


   });
    
})