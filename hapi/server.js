const hapi = require('hapi');
const mongoose = require('mongoose');

const Employee = require('./models/employeeSchema');

const server = hapi.server({
    host: 'localhost',
    port: Number(process.argv[2] || 4000),
});

mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded for GraphQL...') }
    else { console.log(`Error in DB connection : ${err}`)}
});

const init = async () => {

try {
    server.route({
        method: 'POST',
        path: '/emp',
        handler: async (request, h) => {
            let employee= new Employee(request.payload); 
            let result = await employee.save();
            return h.response(result);
        }
    });
    server.route({
        method: 'GET',
        path: '/emp',
        handler: (request, h) => {

            return Employee.find();
        }
    });
    await server.start();
    
    console.log(`Server started at: ${server.info.uri}`);
    } catch (err) {
        console.error(err.stack);
         process.exit(1);
    }
};
    
init();