var mongoose = require('mongoose');
var chalk = require('chalk');
var dbURL = require('./properties').DB;

//console colors
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//connection function

module.exports = ()=>{
    mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on("connected",()=>{
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });

    mongoose.connection.on("error",(err)=>{
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on("disconnected",()=>{
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on("SIGINT",()=>{
        mongoose.connection.close(()=>{
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        })
    })
}
