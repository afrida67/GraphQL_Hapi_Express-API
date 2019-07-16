'use strict';

  exports.errorName = {
    BADREQUEST: 'BADREQUEST',
    NOTFOUND: 'NOTFOUND',
    INTERNALERROR: 'INTERNALERROR'
}

exports.errorType = {
    NOTFOUND: {
        message: 'KEY NOT FOUND',
        statusCode: 404
      },
    INTERNALERROR: {
        message: 'Internal Server Error',
        statusCode: 500 
    },
    BADREQUEST: {
        message: 'Wrong Format',
        statusCode: 400
      },
  };

