var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fs = require('fs');
var async = require('async');
var app = express();


var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var date = moment().format('YYYY-MM-DD HH:mm:ss');

var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-1' });
var params = {
    Message: mes,
    PhoneNumber: '' // Phone Number
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload', upload.single('uploadFile'), function (req, res) {
    var file = req.file;
    async.waterfall([
        getPictures,
        learning,
        sendMessage
    ],
        function (err, st) {
            console.log(st);
            res.sendStatus(st);
        });

    function getPictures(callback) {
        try {
            callback(null, file);
        } catch (error) {
            console.log(error);
        }
    }

    function learning(file, callback) {
        var learnedData = 1;
        setTimeout(function () {
            console.log("learning...");
        }, 5000);
        callback(null, learnedData);
    }
    function sendMessage(res, callback) {
        var st = 500;
        if (res == 1) {
            var publishTextPromise = new AWS.SNS({ apiVersion: '2020-03-31' }).
                publish(params).promise();

            publishTextPromise.then(
                function (data) {
                    console.log("MessageID is " + data.MessageId);
                }).catch(
                    function (err) {
                        console.error(err, err.stack);
                    });
            st = 200;
        }

        callback(null, st);
    }

})

app.get('/', function (req, res) {
    console.log("");
    res.send("");
});

app.listen(80, function () {
    console.log('Server is running in port 80');
});
