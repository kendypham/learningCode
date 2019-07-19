/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require('underscore');

module.exports = {
  identity: 'Order',
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
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    locationId: {
      type: 'string',
    },
    orderItemIds: {
      type: 'json',
      columnType: 'array',
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
    paymentMethod: {
      type: 'string',
      isIn: ['COD', 'Store', 'Gateway', 'Online'],
      defaultsTo: 'COD',
    },
    shipFee: {
      type: 'number',
      columnType: 'float',
      required: true
    },
    createdBy: {
      type: 'string',
      required: true
    },
    paymentCode: {
      type: 'string',
    },
    // paymentGateway: {
    //   type: 'string',
    // },
    carrierId: {
      //Hãng vận chuyển
      type: 'string',
      required: true
    },
    carrierServiceId: {
      //Dịch vụ vận chuyển
      type: 'string',
      required: true
    },
    deliveryDate: {
      //Ngày Nhận
      type: 'ref',
      columnType: 'datetime'

    },
    weight: {
      //gr
      type: 'number',
      columnType: 'float',
      defaultsTo: 500,
    },
    totalPrice: {
      type: 'number',
      columnType: 'float',
      defaultsTo: 0,
    },
    couponCode: {
      type: 'string',
    },
  },

  beforeCreate: (obj, next) => {
    Order.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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

