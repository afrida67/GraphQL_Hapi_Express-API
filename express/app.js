'use strict';

const express = require('express');
const graphHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphQlResolvers = require('./resolver/index');
const mySchema = require('./schema/schema')

const app = express();

const port = process.env.PORT || 4000;

const { errorType } = require('./customError/errors');

const getErrorCode = errorName => {
  return errorType[errorName]
};

mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphqQl Project...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

app.use('/graphql', graphHTTP({
    schema: mySchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    formatError: (err) => {
        const error = getErrorCode(err.message);
        
        if(typeof error === 'undefined'){
            return { message: err.message , statusCode: 400 };
           }
        return ({ message: error.message, statusCode: error.statusCode });
      }

}));

app.listen(port, () => console.log(`Express GraphQL Server started on port ${port}`));