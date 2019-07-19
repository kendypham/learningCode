/**
 * OrderHistory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'OrderHistory',
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
    orderId: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['Confirming', 'Approved', 'Rejected', 'Canceled', 'On hold', 'Shipping', 'Delivered', 'Refunded',
        'Paid', 'Error'],
      defaultsTo: 'Confirming',
    },
    description: {
      type: 'string',
    },
  },

  beforeCreate: (obj, next) => {
    OrderHistory.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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

