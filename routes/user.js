var express = require('express');
var User = require('../Model/User.js');
var userHelper = require('../Helper/userHelper.js');

var router = express.Router();

router
    .post('/login', function (req, res){

        var email  = req.body.email;
        var password = req.body.password;

        User.find({email:email,password:password},function(err,data){
            if (err){
                res.send({code: "401", reason:err.message});
            }  else {
                console.log("error is " + JSON.stringify(err));

                if (data.length > 0){
                    res.send({code:"201"}); // token should be returned...would be changed
                } else{
                    res.send({code : "402", reason :new Error("Email or Password is Wrong").message});
                }
            }
        })
    })
    .post('/signUp',function (req,res){

        userHelper.uploadImage(function(err){
            if (err) {
                res.status(404).send(err.message);
            }else {
                var newUser = new User(req.body);
                newUser.save(function (err) {
                    if (err) {
                        res.send({code: "401", reason: err.message});
                    } else {
                        res.send({code: "201"});
                    }

                });
            }
        })




        /*        fs.readFile( __dirname + '/roger.jpg', function(err, data) {
         if (err) throw err;



         // Encode to base64
         var encodedImage = new Buffer(data, 'binary').toString('base64');
         console.log(encodedImage);


         // Decode from base64
         //var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
         fs.writeFile('base64.txt',encodedImage,function(err){
         if (err){
         res.status(404).send(err.message);
         }else{

         }

         })
         });*/




    })


module.exports = router;


