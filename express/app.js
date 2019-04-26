const express = require('express');
const graphHTTP = require('express-graphql');
const mongoose = require('mongoose');

const mySchema = require('./schema/schema');

const app = express();

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphqQl Project...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

app.use('/graphql', graphHTTP({
    schema: mySchema,
    graphiql: true

}));

app.listen(port, () => console.log(`GraphQL Server started on port ${port}`));