'use strict';

const Employee = require('../models/employeeSchema');
const { errorName } = require('../customError/errors');

module.exports = {

    findEmployee: async (args, context) => {
        try{
            const response = await Employee.findById(args.id);
            if(!response){
                //throw new Error('Key Not found'); 
                throw new Error(errorName.NOTFOUND);
            }
            return response;
        } catch(err){
             throw err.message;
        }

    },
    employeeList: async (args, context) => {
        try{
            const response = await Employee.find();
            if(!response){
                throw new Error(errorName.INTERNALERROR);
            }
            return response;
        } catch (err){
             throw err.message;
        }
    },
    addEmployee : async (args, context) => {
        try {
            const data = new Employee({
                fullName: args.employeeInput.fullName,
                email: args.employeeInput.email,
                mobile: args.employeeInput.mobile,
                city: args.employeeInput.city
            });
            const response = await data.save();
            if(!response){
                throw new Error(errorName.INTERNALERROR);
            }
            return response;
        } catch(err){
             throw err.message;
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
                throw new Error(errorName.NOTFOUND);
            }
            return response;
        } catch(err){
             throw err.message;
        }
    },
    deleteEmployee : async (args, context) => {
        try{
            const response = await Employee.findByIdAndDelete(args.id);
            if(!response){
                throw new Error(errorName.NOTFOUND);
            }
            return response;
        } catch(err){
             throw err.message;
        }
    },
}