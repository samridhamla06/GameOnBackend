var mongoose  = require("../Model/mongoose.js") ;
var locationSchema = new mongoose.Schema(
    {
        type:{type:String,default: 'Point'},
        coordinates:[Number],
        _id:false
    });

module.exports = locationSchema;