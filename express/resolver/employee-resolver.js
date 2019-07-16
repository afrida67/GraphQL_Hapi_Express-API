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
           // console.log('add');
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
        try{
            console.log('edit');
            const data = {
                fullName: args.employeeInput.fullName,
                email: args.employeeInput.email,
                mobile: args.employeeInput.mobile,
                city: args.employeeInput.city
            };
            const response = await Employee.findByIdAndUpdate(args.id, data,{useFindAndModify: false});
            console.log(response);
            return response;
        } catch(err){
             throw err;
        }
    },
    deleteEmployee : async (args, context) => {
        try{
            //console.log('delete');
            const response = await Employee.findByIdAndDelete(args.id);
            if(!response){
                console.log('not found');
                return response ;
            }
            return response;
        } catch(err){
             throw err;
        }
    },
}