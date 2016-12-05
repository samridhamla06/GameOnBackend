var express = require('express');
var Event = require('../Model/Event.js');
var router = express.Router();
var sportLive = require('sports-live');
var City = require('../Model/City.js');

var addEventToCity = function (cityId, eventId, callback) {
    City.findById(cityId, function (err, city) {
        if (err) {
            console.log("error is " + JSON.stringify(err.message));
            res.send({status: "404"});
        } else {
            city.events.addToSet(eventId);
            city.save(callback);
        }
    });
};



router
    .get('/', function (req, res) {  //just all events
        Event.find({}, function (err, events) {
            if (err) {
                console.log('Mongodb error');
                res.send({code: "401", reason: "Couldn't connect to Mongodb"})
            } else {
                res.send(events);
            }
        });
    })
    .get('/bars', function (req, res) { // all bars for an event in a particular city
        var cityId = req.query.cityId;
        var eventId = req.query.eventId;

        Event.findById(eventId, {
            bars: 1,
            _id: 0
        }).populate('bars', null, {city: cityId}, {limit: 5}).exec(function (err, event) {
            if (err) {
                console.log('Mongodb error' + JSON.stringify(err));
                res.send({code: "401"})
            } else {
                res.send(event.bars);
            }
        });
    });



router
    .post('/', function (req, res) {
        var newEvent = new Event(req.body);
        newEvent.save(function (err) {
            if (err) {
                console.log("error is " + JSON.stringify(err.message));
                res.send({code: "401"});
            } else {
                res.send({code: "202"});//event created
            }
        });
    })
    .get('/scores/:eventId',function(req,res){
        var eventId = req.params.eventId;
        Event.findById(eventId).populate('sport').exec(function(err,event){
            if (err) {
                console.log("error is " + JSON.stringify(err.message));
                res.send({code: "401"});
            } else {
                sportLive.getLiveScores(event.sport.name,event.team1,event.team2,function(err,score){
                    if (err){
                        res.send({code:"401",reason:err.message});
                    }else {
                        console.log('the score is ' + JSON.stringify(score));
                        res.send(score);
                    }
                });
            }

        });


    });

router
    .post('/enrollbar', function (req, res) {
        // TODO: I changed here from put to post and to query parameters than normal parameters since
        // TODO : the user will get confused which one to send first

        //TODO: shouldn't it be a PUT as per REST standards, as its an update, moreover if it's a POST, btr we send in body then in URL
        //TODO: always safer.
        var cityId = req.query.cityId;
        var eventId = req.query.eventId;
        var barId = req.query.barId;

        console.log('received ids are ' + cityId + eventId + barId);

        Event.findById(eventId, function (err, event) {
            if (err) {
                console.log("error is " + err.message);
                res.send({code: "401"});
            } else {
                event.bars.addToSet(barId);
                event.updatedAt = Date.now();
                console.log('event updated to ' + JSON.stringify(event));
                event.save(function (err) {
                    if (err) {
                        console.log("error is " + err.message);
                        res.send({code: "402"});
                    } else {
                        addEventToCity(cityId, eventId, function (err) {
                            if (err) {
                                console.log("error is " + err.message);
                                res.send({code: "403"});
                            } else {
                                res.send({code: "201"});
                            }

                        });
                    }
                });

            }
        });
    });


module.exports = router;

