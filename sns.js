var AWS = require('aws-sdk');
AWS.config.update({ region: 'REGION' });

var params = {
  Message: 'TEXT_MESSAGE',};

var publishTextPromise = new AWS.SNS({apiVersion: '2020-03-31'}).
                                                 publish(params).promise();

publishTextPromise.then(
        function(data){
                console.log("MessageID is " + data.MessageId);
        }).catch(
        function(err){
                console.error(err, err.stack);
        });
        