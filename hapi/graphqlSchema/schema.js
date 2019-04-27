const Employee = require('../models/employeeSchema');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        mobile: {type: GraphQLString },
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                fullName: { type: GraphQLString },
                email: { type: GraphQLString },
                mobile: {type: GraphQLString },
                city: {type: GraphQLString }
            },
            resolve(parent, args){
                let employee = new Employee({
                    fullName: args.fullName,
                    email: args.email,
                    mobile: args.mobile,
                    city: args.city
                });
                return employee.save();
            }
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args){
               return Employee.findByIdAndDelete(args.id);
            }
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLString },
                fullName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                mobile: { type: new GraphQLNonNull(GraphQLString)},
                city: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
               return Employee.findByIdAndUpdate(args.id, {
                fullName: args.fullName,
                email: args.email,
                mobile: args.mobile,
                city: args.city
               }, {useFindAndModify: false});
            } 
        },
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});