const hapi = require('hapi');

const { ApolloServer, gql } = require('apollo-server-hapi');

const graphqlSchema = require('./graphqlSchema/schema');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphQL...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

async function StartServer() {

    const server = new ApolloServer({  
        schema: graphqlSchema 
    });
   
    const app = hapi.server({
        port: 4000,
        host:'localhost'
    });
   
    await server.applyMiddleware({
      app,
    });
   
    await server.installSubscriptionHandlers(app.listener);
   
    await app.start();
  }
   
  StartServer().catch(error => console.log(error));
