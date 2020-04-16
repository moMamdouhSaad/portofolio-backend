var mailsController = require('./mails.controller');

module.exports = function(router){

    router.post('/mails/createMail', mailsController.validate('createMail'), mailsController.createMail);

    router.get('/mails/getAllMails', mailsController.getAllmails);

    router.delete('/mails/deleteMail', mailsController.validate('deleteMail'), mailsController.deleteMail);

}

