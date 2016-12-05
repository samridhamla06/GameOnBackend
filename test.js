/**
 * Created by samridhamla06 on 05/12/16.
 */
var app = require('express')();
var server = require('http').createServer(app);

server.listen(9000,function(err){
    console.log('Server is running at 8000 port')
});