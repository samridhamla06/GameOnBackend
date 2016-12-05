var express = require('express');
var City = require('../Model/City.js');
var router = express.Router();


router
    .post('/', function (req, res) {
        var newCity = new City(req.body);
        newCity.save(function (err) {
            if (err) {
                console.log("error is " + JSON.stringify(err));
                res.send({code: "401"});
            } else {
                res.send({code: "201"});//city created
            }
        });
    })
    .get('/', function (req, res) {
        City.find({}, {name: 1}, function (err, cities) {
            if (err) {
                console.log('Mongodb error');
                res.send({code: "401", reason: "Couldn't connect to Mongodb"})
            } else {
                res.send(cities);
            }
        });
    })
    .get('/events', function (req, res) {
        var cityId = req.query.cityId;

        City.findById(cityId, {events: 1, _id: 0}).populate('events').exec(function (err, result) {
            //projection not really required..but just less overload
            if (err) {
                console.log('Mongodb error');
                res.send({code: "401", reason: "Couldn't connect to Mongodb"})
            } else {
                res.send(result.events);//all allEventsInACity in that city
            }
        })
    })

module.exports = router;

