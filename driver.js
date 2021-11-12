'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const faker = require('faker');
const queueUrl = 'https://sqs.us-east-2.amazonaws.com/145980369516/packages.fifo';

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage : message=>{
    const msg = JSON.parse(message.Body);
    const order = JSON.parse(msg.Message);
    console.log('Picked-up ', order);
  
  setTimeout(async ()=>{
    const producer = Producer.create({
      queueUrl: order.vendorId,
      region: 'us-east-2'
    })

    await producer.send({
      id: faker.datatype.uuid(),
      body: JSON.stringify(order)
    })
    console.log(`${order.orderId} delivered!`)
  })
  }


})
consumer.start();