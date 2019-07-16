'use strict';
const Employee = require('../models/employeeSchema');

module.exports = {

    findEmployee: async (args, context) => {
        try{
            const response = await Employee.findById(args.id);
            return response;
        } catch(err){
             throw err;
        }

    },
    employeeList: async (args, context) => {
        try{
            const response = await Employee.find();
            return response;
        } catch(err){
             throw err;
        }
    },
    addEmployee : async (args, context) => {
        try{
            const data = new Employee({
                fullName: args.employeeInput.fullName,
                email: args.employeeInput.email,
                mobile: args.employeeInput.mobile,
                city: args.employeeInput.city
            });
            const response = await data.save();
            return response;
        } catch(err){
             throw err;
        }
    },
    updateEmployee : async (args, context) => {
        try {
            const data = {
                fullName: args.employeeInput.fullName,
                email: args.employeeInput.email,
                mobile: args.employeeInput.mobile,
                city: args.employeeInput.city
            };
            const response = await Employee.findByIdAndUpdate(args.id, data,{ useFindAndModify: false });
            if(!response){
                throw new Error('Key Not found');
            }
            return response;
        } catch(err){
             throw err;
        }
    },
    deleteEmployee : async (args, context) => {
        try{
            const response = await Employee.findByIdAndDelete(args.id);
            if(!response){
                throw new Error('Key Not found');
            }
            return response;
        } catch(err){
             throw err;
        }
    },
}