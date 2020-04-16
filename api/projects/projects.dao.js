var mongoose = require('mongoose');
var projectsSchema = require('./projects.model');

projectsSchema.statics = {
    createProject: async function (data) {
        try{
            const addedProject = await new this(data);
            await addedProject.save();
        }
        catch(e){
            console.log("error occured while saving a new project")
            console.log(e)
        }  
    },
   
    get: async function () {
       try{
          return await this.find({});
       }
       catch(e){
        console.log("error occured while retreive a new project")
        console.log(e)
       }
   },
   updateById: async function(updated){
    try{
        return  await this.updateOne({_id:updated._id},updated)   
    }
    catch(e){
        console.log("error occured while updated  project")
        console.log(e)
    }
   },
   deleteById: async function(id){
       try{
        return  await this.deleteOne({_id:id})   
       }
       catch(e){
        console.log("error occured while updated  project")
        console.log(e);
        return              
       }
   }
}

var projectsModel = mongoose.model('Projects', projectsSchema);
module.exports = projectsModel;