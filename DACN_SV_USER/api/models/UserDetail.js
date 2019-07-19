/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var _ = require('underscore');

module.exports = {
    identity: 'UserDetail',
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
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        address1: {
            type: 'string',
        },
        address2: {
            type: 'string'
        },
        country: {
            type: 'string'
        },
        state: {
            type: 'string'
        },
        gender: {
            type: 'string'
        },
        zip: {
            type: 'string'
        },
        createdAt: {
            type: 'number',
            autoCreatedAt: true,
        },
        updatedAt: {
            type: 'number',
            autoUpdatedAt: true,
        },
        userId: {
            model: 'User'
        },
    },
    customToJSON: function () {
        return _.omit(this, ['password', 'orders', 'Products'])
    },
    beforeCreate: (obj, next) => {
        UserDetail.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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