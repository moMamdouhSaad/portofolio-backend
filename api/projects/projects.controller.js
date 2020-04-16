var Projects = require('./projects.dao');
const { check, validationResult } = require('express-validator');

exports.validate = (method) =>{
    switch(method){
      case "createProject":
        console.log("createProject validator")
            return [
            check("title", "title is required")
            .not()
            .isEmpty().withMessage("tile must not be empty")
            .isLength({ min:2, max:100 }).withMessage("title long min is : 2 chars max is : 100 chars"),
            check("description", "description is required")
            .not()
            .isEmpty().withMessage("description must not be empty")
            .isLength({ min:2, max:3000 }).withMessage("title long min is : 2 chars max is : 3000 chars")
            ];
    case "updateProject":
           console.log("updateProject validator")
            return [
            check("_id", "_id is required")
            .not()
            .isEmpty().withMessage("_id must not be empty")
            ];

    case "deleteProject":
        return [
            check("_id", "_id is required")
            .not()
            .isEmpty().withMessage("_id must not be empty")
            ];   
    }   
}


exports.createProject = async  (req, res, next)=>{
    try{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
        res.status(422).json({ msg:"validationErr", errors: errors.array() });
        return;
       }
       if(!req.file){
           res.status(422).json({msg:"you must select img"});
           return
       }
        const project = {
        title: req.body.title,
        description: req.body.description,
        mainimg_path: req.file.filename
             }
        await Projects.createProject(project);
        res.status(200).json({msg:"new project added successfully",hexCode:"00"})
    }
    catch(e){
        console.log(e);
        res.status(400).json({msg:"err occurred while adding a new project",hexCode:"FF"})
    }
}


exports.getAllProjects = async (req, res, next)=>{
    try{
       const projects = await Projects.get();
       res.status(200).json({msg:"all projects retreived successfully",hexCode:"00", projects:projects})

    }
    catch(e){
        console.log(e);
        res.status(400).json({msg:"error occurred while trying retreive all projects",hexCode:"FF"})
    }

}

exports.updateProject = async (req, res, next)=>{
    try{
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
        res.status(422).json({ msg:"validationErr", errors: errors.array() });
        return;
        }
        const updatedProject = await Projects.updateById(req.body)
        if(updatedProject){
            res.status(200).json({msg:"project updated successfully",hexCode:"00"});
            return
        }
            res.status(400).json({msg:"error occurred while update a project",hexCode:"FF"})
        
    }
    catch(e){
        console.log(e);
        res.status(400).json({msg:"error occurred while update a project",hexCode:"FF"})
    }
}

exports.deleteProject = async (req, res, next)=>{
        try{
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
            res.status(422).json({ msg:"validationErr", errors: errors.array() });
            return;
            }   
            const deletedProject = await Projects.deleteById(req.body._id);
               if(deletedProject){
                res.status(200).json({msg:"project deleted successfully",hexCode:"00"});
                return
                  }      
                res.status(400).json({msg:"error occurred while delete a project",hexCode:"FF"})

        }
        
        catch(e){
            console.log(e);
            res.status(400).json({msg:"error occurred while delete a project",hexCode:"FF"})
        }
}