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

    
}