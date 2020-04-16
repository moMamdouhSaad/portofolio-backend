var Mails = require('./mails.dao');
const { check, validationResult } = require('express-validator');

exports.validate = (method) =>{
    switch(method){
      case "createMail":
          return [
            check("email", "email is required")
            .not()
            .isEmpty().withMessage("email must not be empty")
            .isLength({ min: 2,max:100 }).withMessage("title long min is : 2 chars max is : 100 chars"),
            check("subject", "subject is required")
            .not()
            .isEmpty().withMessage("description must not be empty")
            .isLength({ min: 2,max:3000 }).withMessage("title long min is : 2 chars max is : 3000 chars"),
            check("content", "content is required")
            .not()
            .isEmpty().withMessage("content must not be empty")
            .isLength({ min: 2,max:3000 }).withMessage("content long min is : 2 chars max is : 3000 chars"),
            ];
            
        case "deleteMail":
            return [
                check("_id", "_id is required")
                .not()
                .isEmpty().withMessage("_id must not empty")
            ]    
      default:
    }   
}


exports.createMail = async  (req, res, next)=>{
    try{
       const errors = validationResult(req); 
        if (!errors.isEmpty()) {
        res.status(422).json({ msg:"validationErr", errors: errors.array() });
        return;
       }
        const email = {
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content
             }
        await Mails.createMail(email);
        res.status(200).json({msg:"new mail added successfully",hexCode:"00"})
    }
    catch(e){
        console.log(e);
        res.status(400).json({msg:"err occurred while adding a new mail",hexCode:"FF"})
    }
}


exports.getAllmails = async (req, res, next)=>{
    try{
       const mails = await Mails.get();
       res.status(200).json({msg:"all mails retreived successfully",hexCode:"00", mails:mails})
    }
    catch(e){
        console.log(e);
        res.status(400).json({msg:"error occurred while trying retreive all mails",hexCode:"FF"})
    }

}

exports.deleteMail = async (req, res, next)=>{
    try{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
        res.status(422).json({msg:"validationErr", errors: errors.array()});
        return;
        }   
        const deletedMail = await Mails.deleteById(req.body._id);
           if(deletedMail){
             res.status(200).json({msg:"mail deleted successfully",hexCode:"00"});
             return
              }      
            res.status(400).json({msg:"error occurred while delete a mail",hexCode:"FF"})
    }
    
    catch(e){
        console.log(e);
        res.status(400).json({msg:"error occurred while delete a project",hexCode:"FF"})
    }
}