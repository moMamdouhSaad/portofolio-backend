var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mailsSchema = new Schema({
    email : {
        type: String,
        required : true
    },
    subject : {
        type: String,
        required : true
    },
    content : {
        type: String,
        required : true
    }
});

module.exports = mailsSchema;