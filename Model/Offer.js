var mongoose = require(__dirname + '/mongoose.js');
var path = require('path');
//var locationSchema = require(path.join(__dirname,'/../schemas','/location.js'));
var offerSchema = require(path.join(__dirname,'/../schemas','/offerSchema.js'));

var Offer = mongoose.model('Offer',offerSchema);

module.exports = Offer;