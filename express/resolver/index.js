'use strict'

const employeeResolver = require('./employee-resolver');

const rootResolver = {
  ...employeeResolver,

};

module.exports = rootResolver;