var fs = require("fs");
var AWS = require('aws-sdk');
var accessKeyId =  "AKIAI4DMBZOKQN2QMFWQ" ;
var secretAccessKey = "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";
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});



exports.uploadImage = function(callback){


    fs.readFile('base64.txt', function(err, data) {
        if (err) { callback(err);}

     /*   // Encode to base64
        var encodedImage = new Buffer(data, 'binary').toString('base64');

        // Decode from base64
        var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');

        */
        var s3bucket = new AWS.S3({params: {Bucket: 'user000'}});
        s3bucket.createBucket(function() {
            var params = {Key: 'samla', Body: "hello",region:'us-east-1'};
            s3bucket.upload(params, function(err, data) {
                if (err) {
                    console.log("Error uploading data: ", err);
                    callback(err);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                    callback(err);
                }
            });
        });


//        console.log(decodedImage);
    });


};