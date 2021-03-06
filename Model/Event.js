var mongoose = require(__dirname + '/mongoose.js');
var path = require('path');
var locationSchema = require(path.join(__dirname,'/../schemas','/location.js'));
//var offerSchema = require(path.join(__dirname,'/../schemas','/offerSchema.js'));
//var offerSchema = require(path.join('../../schemas','/offerSchema.js'));



var eventSchema = new mongoose.Schema({
    event_desc: {type: String, required: true},
    event_start_date: {type: Date, required: true},
    country: {type: String, required: true},
    location: {type: locationSchema, index: '2dsphere'},
    venue: {type: String, required: true},
    team1:{type:String,required:true},
    team2:{type:String,required:true},
    match_date:{type:Date},
    sport: {type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true, index: true},
    bars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bar'}],
    insertedAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;