var projectsController = require('./projects.controller');
const multer  = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});

module.exports = function(router){

    router.post('/projects/create', upload.single("main-img"), projectsController.validate("createProject"), projectsController.createProject);

    router.get('/projects/getAllProjects', projectsController.getAllProjects);

    router.put('/projects/updateProject', projectsController.validate("updateProject"), projectsController.updateProject);

    router.delete('/projects/deleteProject', projectsController.validate("deleteProject"), projectsController.deleteProject
    )
    


}

