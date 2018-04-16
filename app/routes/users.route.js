let authController = require('../controllers/authentication.controller.js');
let controller = require('../controllers/users.controller.js');
let maincontroller = require('../controllers/main.controller.js');

module.exports = (app) => {
    app.route('/signin')
        .post(controller.signin);
    app.route('/')
        .get(maincontroller.mainpage);
    app.route('/signup')
        .post(controller.signup);
    app.route('/getall')
        .get(controller.getall);
    app.route('/deleteUser')
        .post(controller.deleteUser);
    app.route('/user')
        .get(authController.requireLogin);
};