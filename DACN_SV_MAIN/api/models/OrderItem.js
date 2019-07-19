/**
 * OrderItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require('underscore');

module.exports = {
  identity: 'OrderItem',
  attributes: {
    id: {
      type: 'string',
      unique: true,
      columnName: '_id',
    },
    index: {
      type: 'number',
      defaultsTo: 1,
    },
    productId: {
      type: 'string',
      required: true
    },
    productName: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      defaultsTo: 0,
    },
    description: {
      type: 'string',
    },
    quantity: {
      type: 'number',
      defaultsTo: 1,
    },
    inCart: {
      type: 'boolean',
      defaultsTo: true,
    },
    createdBy: {
      type: 'string',
      required: true
    },
  },

  beforeCreate: (obj, next) => {
    OrderItem.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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
}