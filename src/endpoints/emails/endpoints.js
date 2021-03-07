'use strict';
const { HTTP_STATUS_CODES } = require('../../constants');
const { processSendEmailRequest, getSentEmails } = require('./emails');

const SendEmail = async(req, res) => {
  const { message } = req.body;
  await processSendEmailRequest({ message });
  res.status(HTTP_STATUS_CODES.CREATED).json();
};

const GetSentEmails = async(req, res) => {
  const { emails } = await getSentEmails();
  res.status(HTTP_STATUS_CODES.OK).json({ emails });
};

module.exports = {
  SendEmail,
  GetSentEmails,
};
