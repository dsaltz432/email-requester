'use strict';
const database = require('../../utilities/database').getInstance();
const { publishMessage } = require('../../utilities/pubsub-sender');
const logger = require('../../utilities/logger').getLogger('endpoints.phrases');
const { createUUID } = require('../../utilities/helpers');
const { COLLECTIONS } = require('../../constants');

const getEmailsCollection = () => {
  return database.getCollection(COLLECTIONS.EMAILS);
};

const getSentEmails = async() => {
  logger.info('Getting all sent emails from the database');
  const emails = await getEmailsCollection().find().toArray();
  return { emails };
};

const processSendEmailRequest = async({ subject, message }) => {

  const emailId = createUUID();

  const mongoEmailObject = {
    _id: emailId,
    subject,
    message,
    events: [{
      timestamp: new Date(),
      reason: 'received email request',
    }],
  };

  logger.info(`Sending email [${emailId}], message: [${message}]`);

  await getEmailsCollection().insertOne(mongoEmailObject);

  const pubsubMessageId = await publishMessage(mongoEmailObject);

  const newEvent = {
    timestamp: new Date,
    reason: 'published message over bus',
    pubsubMessageId,
  };

  await getEmailsCollection().updateOne({ _id: emailId }, { $addToSet: { events: newEvent } });
};


module.exports = {
  processSendEmailRequest,
  getSentEmails,
};
