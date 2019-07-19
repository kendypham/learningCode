//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
 
//create neccessary objects
var app = express();
var router = express.Router();
 
//you need to update wp with your own database name
var db = monk('localhost:27017/wp');
 
 
//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(function(req,res,next){
	req.db = db;
	next();
});
 
//CORS middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
})
 
 
//SERVER SIDE ROUTING
app.use('/', router);
 
router.get('/students', function(req, res) {
    req.db.collection('students').find({},{"limit": 100},function(e,docs){
    	res.json(docs);
	});
});
 
router.get('/student/:id', function(req, res){
  	req.db.collection('students').findById(req.params.id, function(e, doc){
        	res.json(doc);
  	})
});
 
router.put('/student/:id', function(req, res){
  	req.db.collection('students').update({_id: req.params.id}, {name: req.body.name, yob: req.body.yob});
  	req.db.collection('students').findById(req.params.id, function(e, doc){
        	res.json(doc);
  	})
 
});
 
router.delete('/student/:id', function(req, res){
  	req.db.collection('students').remove({_id: req.params.id}, function(e, doc){
        	res.json(doc);
  	})
});
 
router.post('/students', function(req, res){
 
  	console.log(req.body);
  	req.db.collection('students').insert(req.body, function(e, docs){
        	res.json(docs);
  	});
});

//Users

app.post('/register', function (req, res) {
    req.db.collection('users').find({ username: req.body.username }, function (e, docs) {
            if (docs.length === 0) {
                    req.db.collection('users').insert(req.body, function (e, docs) {
                            console.log("register successful")
                            res.json({ "registration": "successful" })
                    })
            }
            else {
                    res.json({ "registration": "failed" })
            }
    })
})

app.post('/login', function (req, res) {
    req.db.collection('users').find({ username: req.body.username, password: req.body.password }, function (err, docs) {
            if (docs.length == 0) {
                    console.log("login successful")
                    res.json({ "authorize": "false" })
            }
            else {
                    console.log("login fail")
                    res.json({ "authorize": "true" })
            }
    })
})
 
module.exports = app;
app.listen(8080);
