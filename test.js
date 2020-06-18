var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var multer = require('multer');
var upload = multer({ dest : 'uploads/'});
var path = require('path');


app.post('/getPictures', function (req, res) {
    var UID = req.body.UID;
    async.waterfall([
        function (callback) {
            var UIDexisted = false;
            for (var i = 0; i < firstResult.length; i++) {
                if (UID == firstResult[i].u_Id) {
                    UIDexisted = true;
                }
            }
            callback(null, UIDexisted);
        },
        // func2 (args 2개 지정)
        function (UIDexisted, callback) {
            if (UIDexisted == false) {
                console.log("새로운 UID");
                var json = "succeed";
            }
            else {
                console.log("이미 있는 UID");
                var json = "succeed";
            }
	    console.log(UID);
            callback(null, json);
        },
    ],
        function (err, result) {
            console.log(result);
            res.send(result);
        }
    )
});

app.get('/', function(req, res) {
    fs.readFile('index.html' , function(error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data, function(error) {
            console.log(error);
        })
    })
})


app.get('/get/test', function (req, res) {
	var id = req.body.id;
	res.send(id);
});

app.listen(3000, function () {
    console.log('Server is running in port 3000');
});
