'use strict';
const CustomError = require('../../utilities/custom-error');
const { HTTP_STATUS_CODES, ERROR_CODES } = require('../../constants');
const { processSendEmailRequest, getSentEmails } = require('./emails');

const SendEmail = async(req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    throw new CustomError({
      errorCode: ERROR_CODES.INVALID_EMAIL_REQUEST,
      message: 'subject and message are required to send an email',
    });
  }

  await processSendEmailRequest({ subject, message });

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
