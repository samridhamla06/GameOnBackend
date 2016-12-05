var express = require('express');
var app = express();
var path = require('path');

var cities = require(__dirname + '/routes/cities.js');
var bars = require(__dirname + '/routes/bars.js');
var events = require(__dirname + '/routes/events.js');
var sports = require(__dirname + '/routes/sports.js');
var offers = require(__dirname + '/routes/offers.js');
var user = require(__dirname + '/routes/user.js');

var bodyParser = require('body-parser');

app.use(bodyParser.json());//post
app.use(bodyParser.urlencoded({extended: false}));//post

app.use(express.static(__dirname + '/public')); // a great tool to have static files

app.post('/*', function (req, res, next) {
    console.log('The request is ' +JSON.stringify(req.body));

    if (req.body == null) {
        res.send({status: "005"});//null body
    } else
        next();
});

app.use('/cities', cities);
app.use('/bars', bars);
app.use('/events', events);
app.use('/sports', sports);
app.use('/offers', offers);
app.use('/user', user);


app.get('/', function (req, res) {
    res.send("Welcome");
});

app.get('/web/hello', function (req, res) {
    //res.sendFile(path.join(__dirname + 'Public/index.html'));
    res.sendFile(__dirname + '/public/hello.html');
});


module.exports = app;
