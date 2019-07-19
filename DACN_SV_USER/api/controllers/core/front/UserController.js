/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var async = require('async');
const fs = require('fs');
var bcrypt = require('bcryptjs');
var pathToService = '../../../services/core/';
var fCSService = require(pathToService + 'back/FCSService');

var EmailService = require(pathToService + 'back/EmailService');

module.exports = {

    profile: function (req, res) {
        var result = {};
        console.log("get profile", req.user.emailAddress);
        async.waterfall([

            function GetProfile(next) {

                User.find({ emailAddress: req.user.emailAddress }).limit(1).populate('profile').exec(function (err, user) {
                    if (err) return next(err);
                    if (!user[0]) return next('NO_USER_FOUND');
                    // console.log(user)
                    result.user = user[0];
                    return next(null);
                });
            },
        ], function (err) {
            if (err) return res.serverError(err);
            return res.json({
                data: result,
            });
        });
    },

    signup: function (req, res) {
        if (req.body.emailAddress && req.body.password) {
            var password = req.body.password;
            var emailAddress = req.body.emailAddress;
            var phoneNumber = req.body.phoneNumber;
            var location = req.body.location;
            var googleId = req.body.googleId;
            var createdOn = req.body.createdOn;
            var isConfirmed = (googleId && createdOn === 'google.com') ? true : false;

            bcrypt.genSalt(10, function (err, salt) {
                if (err) { } else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('hash', hash);
                            var dataToInsert = {
                                'emailAddress': emailAddress,
                                'password': hash,
                                'permission': 'Customer',
                                'isConfirmed': isConfirmed,
                                'phoneNumber': phoneNumber,
                                'location': location,
                                'createdOn': createdOn,
                            }
                            console.log('createxxxx user:', dataToInsert);
                            User.findOrCreate({
                                'emailAddress': emailAddress,
                            }, dataToInsert)
                                .exec(async (err, user, wasCreated) => {
                                    if (err) {
                                        console.log("err create User", err);
                                        return res.sendStatus(409);
                                    }

                                    if (wasCreated) {
                                        console.log("create user final", wasCreated);
                                        if (!req.body.profile)
                                            req.body.profile = []
                                        var profileToInsert = {
                                            'emailAddress': emailAddress,
                                            'firstName': req.body.profile.firstName,
                                            'lastName': req.body.profile.lastName,
                                            'gender': req.body.profile.gender,
                                            'address1': req.body.profile.address1,
                                            'address2': req.body.profile.address2,
                                            'country': req.body.profile.country,
                                            'state': req.body.profile.state,
                                            'zip': req.body.profile.zip,
                                            'userId': user.id,
                                        }
                                        UserDetail.findOrCreate({
                                            'emailAddress': emailAddress,
                                        }, profileToInsert)
                                            .exec(async (err, userDetail, wasCreated) => {
                                                if (err) {
                                                    console.log("Err create UserDetail", err);
                                                    return res.sendStatus(409);
                                                }

                                                if (wasCreated) {
                                                    console.log("create Profile", wasCreated);
                                                    var token = jwToken.sign(user)
                                                    user.profile = userDetail;
													EmailService.sendAlertEmail(emailAddress);
													await sails.helpers.countAndNotifySocket()
                                                    return res.json({
                                                        user: user.emailAddress,
                                                        token: token //generate the token and send it in the response
                                                    });
                                                } else {
                                                    sails.log('Found existing user: ' + user.emailAddress);
                                                    return res.status(409).send('User Detail with that email address already exist :' + user.emailAddress);
                                                }
                                            });

                                    } else {
                                        sails.log('Found existing user: ' + user.emailAddress);
                                        return res.status(409).send('User with that email address already exist :' + user.emailAddress);
                                    }
                                });
                        }
                    });
                }
            });

        } else {
            return res.badRequest();
        }
    },

    update: async (req, res) => {
        let dataToUpdate = {}
        const whitelist = ['location', 'phoneNumber', 'createdOn', 'isConfirmed'];
        if (req.user.permission === 'ADMIN') {
            whitelist.push('permission')
            if (req.body.userId) {
                req.body.id = req.body.userId
            } else {
                req.body.id = req.user.id
            }

        } else
            req.body.id = req.user.id
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }

        user = await sails.helpers.userFindOne.with({ id: req.body.id })
        if (!user) return res.badRequest("idNotFound")

        var waitUpdate = null

        if (Object.entries(dataToUpdate).length > 0) {
            waitUpdate = await sails.helpers.userUpdate.with({ id: req.body.id, dataToUpdate })
        }

        if (req.body.profile) {
            if (!user.profile[0].id) return res.badRequest("profile not found")
            let dataProfile = {}
            const whitelist = ['firstName', 'lastName', 'address1', 'address2', 'country', 'state', 'gender', 'zip'];
            for (let key in req.body.profile) {

                if (whitelist.indexOf(key) < 0) continue
                const prop = req.body.profile[key]
                if (prop) dataProfile[key] = prop
            }
            if (Object.entries(dataProfile).length > 0) {
                profile = await sails.helpers.userDetailUpdate.with({ id: user.profile[0].id, dataToUpdate: dataProfile })
                if (!waitUpdate)
                    waitUpdate = {}
                waitUpdate['profile'] = profile
            }
        }
        console.log("xxxxxxxxx", waitUpdate)
        if (waitUpdate) {
            return res.ok(waitUpdate)
        } else return res.badRequest("idNotFound")
    },

    login: async (req, res) => {
        console.log('UserController - login');
        var emailAddress = req.body.emailAddress;
        var user = await sails.helpers.userFindOneByEmail.with({ emailAddress: emailAddress })
        if (!user) return res.notFound('user not found')
        async.waterfall([
            function Validate(next) {

                try {
                    bcrypt.compare(req.body.password, user.password, function (err, isSuccess) {
                        if (err) return next(err);

                        if (isSuccess) {
                            return next(null, user);
                        } else { // login view with error message
                            return next("emailAddress and password combination do not match");
                        }
                    });
                } catch (err) {
                    // Handle the error here.
                    console.log(err);

                }
            }
        ], function (err, user) {
            if (err) return res.badRequest(err);
            if (!user) {
                return res.badRequest('Or permission. The password is different.');
            } else {
                //password is a match
                console.log("login successful");
                user.profile = undefined
                return res.json({
                    user: user.emailAddress,
                    token: jwToken.sign(user) //generate the token and send it in the response
                });
            }
        });
    },

    forgotPassword: function (req, res) {
        async.waterfall([
            function GetUser(next) {
                User.find({
                    'emailAddress': req.body.emailAddress
                }).limit(1).exec(function (err, user) {
                    if (err) return next(err);
                    if (!user[0]) return next('NO USER FOUND');
                    return next(null, user[0]);
                });
            },

            function Encrypt(user, next) {
                var code = randomString(20);
                User.update({
                    'emailAddress': req.body.emailAddress
                }, {
                        reset_password_code: code
                    }, function (err) {
                        if (err) return next(err);
                        user.reset_password_code = code;
                        return next(null, user);
                    });

            },
        ], function (err, updatedUser) {
            if (err) return res.serverError(err);
            if (!updatedUser.reset_password_code) return res.serverError();
            var token = jwToken.sign(updatedUser.reset_password_code)
            EmailService.forgotPasswordMail(updatedUser.emailAddress, null, token);
            return res.ok();
        });
    },

    resetPassword: async (req, res) => {

        if (!req.body.emailAddress || !req.body.token || !req.body.newPassword)
            return res.badRequest();

        async.waterfall([
            function GetUser(next) {

                User.find({
                    'emailAddress': req.body.emailAddress
                }).limit(1).exec(function (err, user) {
                    if (err) return next(err);
                    if (!user[0]) return next('NO USER FOUND');

                    return next(null, user[0]);
                });
            },

            function Compare(user, next) {
                jwToken.verify(req.body.token, function (err, decoded) {
                    if (err) {
                        return next(err);
                    }

                    code = decoded.data;
                    if (code === user.reset_password_code) {
                        var hash = bcrypt.hashSync(req.body.newPassword, 10);
                        User.update({
                            'emailAddress': req.body.emailAddress
                        }, {
                                reset_password_code: '',
                                password: hash
                            }, function (err) {
                                if (err) return next(err);
                                return next(null, user);
                            });
                    }
                    else
                        return next("Invalid Token");
                });
            },
        ], function (err, updatedUser) {
            if (err) return res.badRequest(err);
            return res.ok();
        });
    },

    createAdmin: function (req, res) {
        if (!req.body.adminCode || req.body.adminCode !== '15520891') {
            return res.badRequest("adminCode is wrong!");
        }
        if (req.body.emailAddress && req.body.password) {
            var password = req.body.password;
            var emailAddress = req.body.emailAddress;
            var phoneNumber = req.body.phoneNumber;
            var location = req.body.location;
            var googleId = req.body.googleId;
            var createdOn = req.body.createdOn;
            var isConfirmed = (googleId && createdOn === 'google.com') ? true : false;

            bcrypt.genSalt(10, function (err, salt) {
                if (err) { } else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('hash', hash);
                            var dataToInsert = {
                                'emailAddress': emailAddress,
                                'password': hash,
                                'permission': 'ADMIN',
                                'isConfirmed': isConfirmed,
                                'phoneNumber': phoneNumber,
                                'location': location,
                                'createdOn': createdOn,
                            }
                            console.log('createxxxx user:', dataToInsert);
                            User.findOrCreate({
                                'emailAddress': emailAddress,
                            }, dataToInsert)
                                .exec(async (err, user, wasCreated) => {
                                    if (err) {
                                        console.log("err create User", err);
                                        return res.sendStatus(409);
                                    }

                                    if (wasCreated) {
                                        console.log("create user final", wasCreated);
                                        if (!req.body.profile)
                                            req.body.profile = []
                                        var profileToInsert = {
                                            'emailAddress': emailAddress,
                                            'firstName': req.body.profile.firstName,
                                            'lastName': req.body.profile.lastName,
                                            'gender': req.body.profile.gender,
                                            'address1': req.body.profile.address1,
                                            'address2': req.body.profile.address2,
                                            'country': req.body.profile.country,
                                            'state': req.body.profile.state,
                                            'zip': req.body.profile.zip,
                                            'userId': user.id,
                                        }
                                        UserDetail.findOrCreate({
                                            'emailAddress': emailAddress,
                                        }, profileToInsert)
                                            .exec(async (err, userDetail, wasCreated) => {
                                                if (err) {
                                                    console.log("Err create UserDetail", err);
                                                    return res.sendStatus(409);
                                                }

                                                if (wasCreated) {
                                                    console.log("create Profile", wasCreated);
                                                    var token = jwToken.sign(user)
                                                    user.profile = userDetail;
                                                    EmailService.sendAlertEmail(emailAddress);
                                                    return res.json({
                                                        user: user.emailAddress,
                                                        token: token //generate the token and send it in the response
                                                    });
                                                } else {
                                                    sails.log('Found existing user: ' + user.emailAddress);
                                                    return res.status(409).send('User Detail with that email address already exist :' + user.emailAddress);
                                                }
                                            });
                                    } else {
                                        sails.log('Found existing user: ' + user.emailAddress);
                                        return res.status(409).send('User with that email address already exist :' + user.emailAddress);
                                    }
                                });
                        }
                    });
                }
            });

        } else {
            return res.badRequest();
        }
    },

    sendConfirmationEmail: function (req, res) {
        async.waterfall([

            function GetProfile(next) {
                User.find(req.user.id).limit(1).exec(function (err, user) {
                    if (err) return next(err);
                    if (!user[0]) return next('NO USER FOUND');
                    if (user[0].isConfirmed) return next('User is already confirmed');
                    EmailService.sendAlertEmail(user[0].emailAddress);
                    return next(null);

                });
            },
        ], function (err) {
            if (err) return res.serverError(err);
            return res.ok();
        });
    },

    confirm: function (req, res) {
        if (!req.query.token) return res.badRequest();

        jwToken.verify(req.query.token, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    err: 'Invalid Email Token'
                });
            }
            console.log("1", emailAddress = decoded.data);
            emailAddress = decoded.data;
            User.find({
                'emailAddress': emailAddress
            }).limit(1).exec(function (err, user) {
                if (err) return res.serverError(err);
                if (!user[0]) return res.serverError('NO USER FOUND');
                if (user[0].isConfirmed)
                    return res.status(409).send('User is already confirmed');

                User.update({
                    emailAddress: emailAddress
                }, {
                        isConfirmed: true
                    }, function (err) {
                        console.log("Confirmed", emailAddress)
                        if (err) return res.serverError(err);
                        return res.ok();
                    });
            });
        });
    },

    remove: function (req, res) {
        if (!req.params.id) return res.badRequest();
        if (req.user.permission !== "ADMIN") return res.forbidden();
        idRemove = req.params.id;
        console.log("destroying", idRemove);
        User.find(idRemove).limit(1).exec(function (err, user) {
            console.log("1");
            if (err) return res.serverError(err);
            console.log("2");
            if (!user[0]) return res.serverError('NO USER FOUND');
            async.waterfall([

                function deleteUser(next) {
                    User.destroy(idRemove).exec(function (err) {
                        if (err) {
                            return next(err);
                        }
                        console.log("User Removed", user[0].emailAddress)
                        return next(null);
                    })
                },

                function deleteProfile(next) {
                    console.log("Profile Remove", user[0].emailAddress)
                    UserDetail.destroy({
                        emailAddress: user[0].emailAddress
                    }).exec(async function (err) {
                        if (err) {
                            return next(err);
						}
						await sails.helpers.countAndNotifySocket()
                        console.log("Profile Removed", user[0].emailAddress)
                        return next(null);
                    })
                }
            ],
                function (err) {
                    if (err) return res.serverError(err);
                    return res.ok();
                });
        });
    },

    loginWithGoogle: async (req, res) => {
        console.log('UserController - login', req.body);

        try {
            if (!req.body.emailAddress || !req.body.googleId)
                return res.badRequest();
            var emailAddress = req.body.emailAddress;
            var user = await sails.helpers.userFindOneByEmail.with({ emailAddress: emailAddress })

            if (!user) {
                fCSService.getUser(req.body.emailAddress)
                    .then(function (newData) {
                        if (!newData) {
                            return res.badRequest("Please Contact the Administrator");
                        }
                        //Create new User from data
                        var dataToInsert = {
                            'emailAddress': emailAddress,
                            'password': 'uqLh5ta3R5TSJtBNxE1io3P3mdK2',
                            'permission': 'Customer',
                            'isConfirmed': true,
                            'phoneNumber': newData.phoneNumber,
                            'createdOn': 'google.com',
                            'avatar': newData.photoURL,
                        }
                        console.log(" doing User", dataToInsert);
                        User.findOrCreate({
                            'emailAddress': emailAddress,
                        }, dataToInsert)
                            .exec(async (err, user, wasCreated) => {
                                if (err) {
                                    console.log("err create User", err);
                                    return res.serverError(err);
                                }
                                console.log("created User", user);
                                if (wasCreated) {
                                    // console.log("create user final", wasCreated);

                                    var profileToInsert = {
                                        'emailAddress': emailAddress,
                                        'firstName': newData.displayName,
                                        'userId': user.id
                                    }
                                    UserDetail.findOrCreate({
                                        'emailAddress': emailAddress,
                                    }, profileToInsert)
                                        .exec(async (err, userDetail, wasCreated) => {
                                            if (err) {
                                                console.log("Err create UserDetail", err);
                                                return res.sendStatus(409);
                                            }

                                            if (wasCreated) {
                                                console.log("createxxx user", user);
                                                user.password = ''

                                                var token = jwToken.sign(user)
                                                EmailService.sendAlertEmail(emailAddress);
                                                return res.json({
                                                    user: user.emailAddress,
                                                    token: token //generate the token and send it in the response
                                                });
                                            } else {
                                                sails.log('Found existing user: ' + user.emailAddress);
                                                return res.status(409).send('User Detail with that email address already exist :' + user.emailAddress);
                                            }
                                        });
                                } else {
                                    sails.log('Found existing user: ' + user.emailAddress);
                                    return res.status(409).send('User with that email address already exist :' + user.emailAddress);
                                }
                            });
                    }).catch(function (error) {
                        console.log("xx", error);
                        return res.notFound(error);
                    });
            } else {
                user.profile = undefined
                //Update role User
                return res.json({
                    user: user.emailAddress,
                    token: jwToken.sign(user) //generate the token and send it in the response
                });
            }

        } catch (err) {
            // Handle the error here.
            console.log(err);
            return res.serverError(err);
        }

    },

    read: async (req, res) => {
        const { id } = req.params
        const { limit, permission, skip } = req.query
        var mLimit = limit ? limit : 1000;
        var mSkip = skip ? skip : 0;
        var mPermission = permission ? permission : '';
        let waitRead = null

        if (req.user.permission !== "ADMIN") return res.forbidden();
        if (!id) {
            waitRead = await sails.helpers.userFind.with({ limit: mLimit, skip: mSkip, permission: mPermission })
            if (waitRead) {
                return res.ok(waitRead)
            }
            else return res.notFound("empty")

        }
        else {
            waitRead = await sails.helpers.userFindOne(id)
            if (waitRead) {
                return res.json(200, waitRead)
            }
            else return res.notFound("idNotFound")
        }
    },
    uploadAvatar: async (req, res) => {
        console.log("xxxx", req.user)
        console.log("xxx", req.user.id)
        req.file('avatar').upload({}, async (err, uploadedFiles) => {
            if (err) return res.badRequest()
            const imgURL = await sails.helpers.imageUpload.with({ file: uploadedFiles[0].fd })
            if (!imgURL) return res.badRequest()

            const readUser = await sails.helpers.userFindOne.with({ id: req.user.id })
            if (readUser.avatar)
                await sails.helpers.imageDestroy.with({ fileName: readUser.avatar })

            dataToUpdate = {}
            dataToUpdate.avatar = imgURL
            const userUpdated = await sails.helpers.userUpdate.with({ id: req.user.id, dataToUpdate })
            return userUpdated ? res.ok(userUpdated) : res.badRequest()
        })
    },
    changePassword: async (req, res) => {
        if (!req.body.oldPassword || !req.body.newPassword || !req.user) return res.badRequest('value invalid')

        const user = await User.findOne({ where: { id: req.user.id } })
        if (!user) return res.badRequest('user not found')
        let isCheckPass = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!isCheckPass) return res.badRequest('Password incorrect')
        let dataToUpdate = {}
        var hash = bcrypt.hashSync(req.body.newPassword, 10);
        dataToUpdate['password'] = hash
        const userUpdated = await sails.helpers.userUpdate.with({ id: req.user.id, dataToUpdate })
        return userUpdated ? res.ok() : res.badRequest()
    }
}

function randomString(length, chars) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';

    for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return result;
}
function destroyFile(path) {
    fs.unlink(path, function (error) {
        console.log("error destroy file ", error);
    })
}