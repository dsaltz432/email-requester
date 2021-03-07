'use strict';
const { PubSub } = require('@google-cloud/pubsub');

const TOPIC_NAME = process.env.TOPIC_NAME ?? 'projects/fifth-boulder-274618/topics/email-requester-sender';

let pubsubClient;

const publishMessage = async(object) => {

  if (!pubsubClient) {
    pubsubClient = new PubSub();
  }

  const dataBuffer = Buffer.from(JSON.stringify(object));

  return await pubsubClient.topic(TOPIC_NAME).publish(dataBuffer);
};

module.exports = {
  publishMessage,
};
