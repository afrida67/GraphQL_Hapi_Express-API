const Employee = require('../models/employeeSchema');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} = require('graphql');


const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: {type: GraphQLString },
        city: {type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Employee.findById(args.id);
            }
        },
        employeelist: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                return Employee.find();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});