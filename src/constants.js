'use strict';

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_CODES = {
  ERROR_PROCESSING_SEND_EMAIL: { errorId: 'requester.1', statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, logged: true },
  INVALID_EMAIL_REQUEST: { errorId: 'requester.2', statusCode: HTTP_STATUS_CODES.BAD_REQUEST, logged: true },
};

const COLLECTIONS = {
  EMAILS: 'emails',
};

module.exports = {
  HTTP_METHODS,
  HTTP_STATUS_CODES,
  ERROR_CODES,
  COLLECTIONS,
};
