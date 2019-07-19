// InsertDbService.js

//var nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectID;


console.log('sails.config.datastores');

var urlConnection = sails.config.datastores.default.url;

getValueFromArray = function (data, element, type) {

        var output = '';
        // console.log('enter function getValueArray');
        // console.log('data.element',data.[element] );
        if (data && data[element]) {

            if (type == 'int') {
                //  output = parseInt(data[element])
            } else {
                output = data[element];
            }
        }
        return output;

    },

    module.exports = {
        sendAlertEmail: function () {
            var mailOptions = {
                from: sails.config.project.nodemailer.sender, // sender address
                to: sails.config.project.nodemailer.mailToAlert, // send to self
                subject: 'New order created!', // Subject line
                html: '<p>You have new order.</p> Check your admin panel at <a href="' + sails.config.project.website + '/admin/' + '"></a> ' // html body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) return console.log(err);
                else return console.log('Message sent: ' + info.response);
            });
        },

        test: function () {
            return 'test ok service';
        },

        installSubscriptionNewsletter: function (email) { // Insert an order

            if (email) {

                var MongoClient = require('mongodb').MongoClient;

                //Connect to the db
                MongoClient.connect(urlConnection).then(function (db) {

                    var date = new Date();
                    var createdAt = date.toISOString();
                    var updatedAt = date.toISOString();

                    var collection = db.collection('front_subscription_newsletter');
                    var data = {
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                        email: email
                    };

                    if (sails.config.demoMode != 1) {

                        collection.insert(data, function (error, result) {
                            if (error) console.log(error);
                            if (result) {
                                console.log(result);
                            }
                        })
                    }

                });

            } else {
                return false;
            }
        },
    }