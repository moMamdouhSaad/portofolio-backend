var mongoose = require('mongoose');
var mailsSchema = require('./mails.model');

mailsSchema.statics = {
    createMail : async function (data) {
        try{
            console.log(this)
            const addedMail = await new this(data);
            await addedMail.save();
        }
        catch(e){
            console.log("error occured while saving a new mail")
            console.log(e)
        }  
    },
   
    get : async function () {
       try{
          return await this.find({});
       }
       catch(e){
        console.log("error occured while retreive a all mails")
        console.log(e)
       }
   },
   deleteById: async function(id){
       try{
           return await this.deleteOne({_id:id})
       }
       catch(e){
        console.log("error occured while delete  a mail")
        console.log(e)
       }
   }
}

var mailsModel = mongoose.model('Mails', mailsSchema);
module.exports = mailsModel;