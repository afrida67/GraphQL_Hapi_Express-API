const express = require('express');
const graphHTTP = require('express-graphql');
const mongoose = require('mongoose');

const mySchema = require('./schema/schema');
const graphQlResolvers = require('./resolver/index');

const schema = require('./schema/schema2')

const app = express();

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphqQl Project...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

app.use('/graphql', graphHTTP({
    schema: schema,
    rootValue: graphQlResolvers,
    graphiql: true

}));

app.listen(port, () => console.log(`Express GraphQL Server started on port ${port}`));