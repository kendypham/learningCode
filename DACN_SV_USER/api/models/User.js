/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var _ = require('underscore');

module.exports = {
    identity: 'User',
    attributes: {
        id: {
            type: 'string',
            columnName: '_id'
        },
        index: {
            type: 'number',
            unique: true,
            defaultsTo: 1,
        },
        emailAddress: {
            type: 'string',
            unique: true,
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
        location: {
            type: 'json',
        },
        permission: {
            type: 'string',
        },
        phoneNumber: {
            type: 'string'
        },
        // SERVER or GOOGLEMAIL?
        createdOn: {
            type: 'string'
        },
        isConfirmed: {
            type: 'boolean'
        },
        profile: {
            collection: 'UserDetail',
            via: 'userId'
        },
        avatar: {
            type: 'string',
        },
        reset_password_code: {
            type: 'string'
        },
    },
    customToJSON: function () {
        return _.omit(this, ['password'])
    },
    beforeCreate: (obj, next) => {
        User.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
            if (err) next(err);
            else {
                if (max.length === 0) {
                    obj['index'] = 1
                    next(null)
                }
                obj['index'] = max[0].index + 1;
                next(null);
            }
        })
    },
};