var mongoose = require(__dirname + '/mongoose.js');

var loginSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String,required:true},
    name:{type: String,required:true},
    phoneNumber:{type:String},
    insertedAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

var Login = mongoose.model('Login', loginSchema);

module.exports = Login;