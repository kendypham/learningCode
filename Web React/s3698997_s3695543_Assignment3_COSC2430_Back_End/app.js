//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var path = require('path');

//create neccessary objects
var app = express();
var router = express.Router();

//you need to update wp with your own database name
var db = monk('mongodb://vidb:vitran269@cluster0-shard-00-00-aukte.gcp.mongodb.net:27017,cluster0-shard-00-01-aukte.gcp.mongodb.net:27017,cluster0-shard-00-02-aukte.gcp.mongodb.net:27017/vidb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');


var date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })

//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
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

app.use('/', router);

//Estates

router.get('/estates', function (req, res) {
        req.db.collection('estates').find({}, { "limit": 100000000 }, function (e, docs) {
                res.json(docs);
        });
});

router.get('/estates/byUser/:username', function (req, res) {
        req.db.collection('estates').find({ user: req.params.username }, { "limit": 100000000 }, function (e, docs) {
                if (docs.length == 0) {
                        console.log(null)
                }
                else {
                        res.json(docs)
                }
        })
})

router.post('/estates/byUser', function (req, res) {
        if (req.body.user) {
                req.db.collection('estates').insert({
                        id: req.body.id,
                        title: req.body.title,
                        price: req.body.price,
                        area: req.body.area,
                        bedrooms: req.body.bedrooms,
                        floors: req.body.floors,
                        direction: req.body.direction,
                        contactInfo: req.body.contactInfo,
                        address: req.body.address,
                        postDate: req.body.postDate,
                        expiredDate: req.body.expiredDate,
                        imageUrl: req.body.imageUrl,
                        project: req.body.project,
                        user: req.body.user,
                        date: date
                }, function (e, docs) { res.json(docs) })
        }
        else { res.json("Unauthorized access") }
})

router.get('/estates/:id', function (req, res) {
        req.db.collection('estates').findOne({ _id: req.params.id }, function (e, doc) {
                res.json(doc);
        })
});

router.delete('/estates/:id', function (req, res) {
        req.db.collection('estates').remove({ _id: req.params.id }, function (e, doc) {
                res.json(doc)
        })
});


router.put('/estates/', function (req, res) {
        if (req.body.user) {
                req.db.collection('estates').update({ _id: req.body._id }, {
                        id: req.body.id,
                        title: req.body.title,
                        price: req.body.price,
                        area: req.body.area,
                        bedrooms: req.body.bedrooms,
                        floors: req.body.floors,
                        direction: req.body.direction,
                        contactInfo: req.body.contactInfo,
                        address: req.body.address,
                        postDate: req.body.postDate,
                        expiredDate: req.body.expiredDate,
                        imageUrl: req.body.imageUrl,
                        project: req.body.project,
                        user: req.body.user,
                        date: date
                });

                req.db.collection('estates').findOne({ _id: req.body._id }, function (e, doc) {
                        res.json(doc);
                })
        }
        else {
                res.json("Unauthorized access")
        }
});

//Projects

router.get('/projects', function (req, res) {
        req.db.collection('projects').find({}, { "limit": 100000000 }, function (e, docs) {
                res.json(docs)
        })
})

router.get('/projects/byUser/:userID', function (req, res) {
        req.db.collection('projects').find({ user: req.params.userID }, { "limit": 100000000 }, function (e, docs) {
                if (docs.length == 0) {
                        console.log(null)
                }
                else {
                        res.json(docs)
                }
        })
})

router.post('/projects/byUser', function (req, res) {
        if (req.body.user) {
                req.db.collection('projects').insert({
                        id: req.body.id,
                        name: req.body.name,
                        owner: req.body.owner,
                        type: req.body.type,
                        totalArea: req.body.totalArea,
                        endYear: req.body.endYear,
                        user: req.body.user
                }, function (e, docs) { res.json(docs) })
        }
        else { res.json("Unauthorized access") }
})

router.get('/projects/:id', function (req, res) {
        req.db.collection('projects').findOne({ _id: req.params.id }, function (e, doc) {
                res.json(doc);
        })
});

router.delete('/projects/:id', function (req, res) {
        req.db.collection('projects').remove({ _id: req.params.id }, function (e, doc) {
                res.json(doc)
        })
});

router.put('/projects/', function (req, res) {
        if (req.body.user) {
                req.db.collection('projects').update({ _id: req.body._id }, {
                        id: req.body.id,
                        name: req.body.name,
                        owner: req.body.owner,
                        type: req.body.type,
                        totalArea: req.body.totalArea,
                        endYear: req.body.endYear,
                        user: req.body.user
                });

                req.db.collection('projects').findOne({ _id: req.body._id }, function (e, doc) {
                        res.json(doc);
                })
        }
        else { res.json("Unauthorized access") }
});


//User

app.post('/register', function (req, res) {
        req.db.collection('users').find({ username: req.body.username }, function (e, docs) {
                if (docs.length === 0) {
                        req.db.collection('users').insert(req.body, function (e, docs) {
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
                console.log(docs)
                if (docs.length == 0) {
                        console.log("Sai roi")
                        res.json({ "authorize": "false" })
                }
                else {
                        
                        res.json({ "authorize": "true" })
                }
        })
})

router.get('/users', function (req, res) {
        req.db.collection('users').find({}, { "limit": 100000000 }, function (e, docs) {
                res.json(docs);
        });
});


//Filter
app.post('/estates/filter', function (req, res) {
        req.db.collection('estates').find({
                $or: [
                        { price: { $gte: req.body.minPrice, $lte: req.body.maxPrice } },
                        { area: { $gte: req.body.minArea, $lte: req.body.maxArea } },
                        { bedrooms: { $gte: req.body.minBedrooms, $lte: req.body.maxBedrooms } },
                        { floors: { $gte: req.body.minFloors, $lte: req.body.maxFloors } },
                ]
        }, function (e, docs) {
                res.json(docs)
        })
})

app.get('/', (req, res) => res.send('Backend using MongoDb currently listening on port 3000. Add "/estates", "/projects" to see more.'));
app.listen(3000, () => console.log('Backend using MongoDb currently listening on port 3000. Add "/estates", "/projects" to see more.'));