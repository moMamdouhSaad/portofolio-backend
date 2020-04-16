var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectsSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    mainimg_path : {
        type: String,
        required : true
    }
});

module.exports = projectsSchema;