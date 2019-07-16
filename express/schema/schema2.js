'use strict';

const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Employee {
    _id: ID!
    fullName: String!
    email: String!
    mobile: String!
    city: String!
}


type RootQuery {
  findEmployee(id: String!): Employee
  employeeList: [Employee]
 
}

schema {
    query: RootQuery
}
`);


