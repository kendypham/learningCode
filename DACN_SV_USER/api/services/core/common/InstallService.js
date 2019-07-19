/* Copyright 2016 PayPal */
"use strict";

const url = sails.config.datastores.default.url;
const ObjectId = require('mongodb').ObjectID;
const _ = require('underscore');


module.exports = {

    checkDbMongo: function (req, res) {
        return new Promise(function (resolve, reject) {
            console.log("InstallService - checkDbMongo");
            let data = {
                "code": 200
            };
            let output = 0;

            const MongoClient = require('mongodb').MongoClient;
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    console.log("InstallService - checkDbMongo - err - 1", err);
                    resolve(0);
                    //let data = {"error": "mongodb connexion not possible - 2"};
                    //return res.json(data);
                } else {
                    console.log("InstallService - checkDbMongo - no err");
                    resolve(1);
                }
            })
        })
    }
}