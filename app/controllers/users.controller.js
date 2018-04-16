const async = require('async');
const _ = require('lodash');
const jwt = require('../../config/jwt');
const db = require('../../config/db');


/**
 * POST: /signin
 * { email, password }
 **/
module.exports.signin = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
		return next({statusCode: 400, message: res.__('invalidParams')});
	}

    async.waterfall([
        (nextStep) => {
            db.User.findOne({
                where: { email }
            }).then(user => {
                if (!user) next({statusCode: 401, message: 'not found user'});
                else nextStep(null, user);
            }).catch(nextStep);
        },
        (user, nextStep) => {
            user.authenticate(password,user.password).then(valid => {
				if (valid) {
					let data = _.pick(user.get(), ['id', 'email', 'createdAt', 'updatedAt']);
					let token = jwt.generate(data);
					nextStep(null, { token,data });//original : nextStep(null, { token, data });
				} else nextStep({statusCode: 400, message: 'invalid password'});
            }).catch(nextStep);
        }
    ], (err, result) => {
        if (err) next(err);
        else {
            res.json(result);
        }
    });
};


module.exports.signup = (req,res,next) => {
    let email = req.body.email;
    let password = req.body.password;
    async.waterfall([
        (nextStep) => {
            db.User.findOne({
                where: { email }
            }).then(user => {
                if (user) next({statusCode: 401, message: 'already existing user'});
                else nextStep(null);
            }).catch(nextStep);
        },
        (nextStep) => {
            db.User.create({
                email: email,
                password: password
            })
            .then(created => {
                if(!created) next({statusCode: 401, message: 'user creating error!'});
                else nextStep(null,created);
            })
            .catch(nextStep);
        },
    ], (err, result) => {
        if (err) next(err);
        else res.json(result);
    });
};

module.exports.getall = (req,res,next) => {
    async.waterfall([
        (nextStep) => {
            db.User.findAll().then(user => {
                if (!user) next({statusCode: 401, message: 'no users'});
                else nextStep(null,user);
            }).catch(nextStep);
        },
    ], (err, result) => {
        if (err) next(err);
        else res.send(result);
    });
};

module.exports.deleteUser = (req,res,next) => {
    let id = req.body.id;
    async.waterfall([
        (nextStep) => {
            db.User.findOne({
                where: { id }
            }).then(user => {
                if (!user) next({statusCode: 401, message: 'invalid id! cannot delete from database'});
                else nextStep(null,user);
            }).catch(nextStep);
        },
        (user,nextStep) => {
            db.User.destroy({
                where: {id: user.id}
            })
            .then(rowDeleted => {
                if(rowDeleted != 1) next({statusCode: 401, message: 'user delete error!'});
                else res.send("successfully deleted");
            })
        }
    ]);
};
