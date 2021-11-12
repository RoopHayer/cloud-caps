'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

AWS.config.update({ region: 'us-east-2'});
const faker = require('faker');
const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-east-2:145980369516:pickup.fifo';

let order = {
  orderId: faker.datatype.uuid(),
  customer: faker.name.findName(),
  vendorId: 'https://sqs.us-east-2.amazonaws.com/145980369516/flowers'
}
const payload ={
  Message: JSON.stringify(order),
  TopicArn : topic,
  MessageGroupId: '111',
  MessageDeduplicationId: faker.datatype.uuid()

};

setInterval(()=>{
  sns.publish(payload).promise().then()
  .catch(e => {
    console.log(e);
  })
},5000)

  const server = Consumer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/145980369516/flowers',
    handleMessage: message =>{
    console.log(JSON.parse(message.Body));
    }
  });
  server.start();