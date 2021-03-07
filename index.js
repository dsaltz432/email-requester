'use strict';

// initialize config as the very first step
require('dotenv').config();

const logger = require('./src/utilities/logger').getLogger('index');
const webapp = require('./src/utilities/webapp');
const database = require('./src/utilities/database').getInstance();

const { SendEmail, GetSentEmails } = require('./src/endpoints/emails/endpoints');
webapp.post('/v1/email-requester/emails', SendEmail);
webapp.get('/v1/email-requester/emails', GetSentEmails);


const start = async() => {

  // connect to mongo
  await database.connect();

  // start webapp
  webapp.start();

};

start()
  .then(() => {
    logger.info(`Email Requester started up using node version ${process.version}`);
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
