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

input EmployeeInput {
    fullName: String!
    email: String!
    mobile: String!
    city: String!
}

type RootQuery {
  findEmployee(id: String!): Employee
  employeeList: [Employee]
}


type RootMutation {
    addEmployee(employeeInput: EmployeeInput): Employee
    deleteEmployee(id: String!): Employee
    updateEmployee(id: String!, employeeInput: EmployeeInput): Employee
  }
  
schema {
    query: RootQuery,
    mutation: RootMutation
}
`);


