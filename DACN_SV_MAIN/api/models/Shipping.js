/**
 * Shipping.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'Shipping',
  /**
   * Mỗi Category một Shipping
   */
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
      required: true,
    },
    from: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      isIn: ['Preparing', 'Shipping', 'On Hold', 'Unshipped', 'Out For Delivery', 'Delivered'],
      defaultsTo: 'Preparing',
    },
    codMoney: {
      type: 'number',
      required: true,
    },
    /**
    * 1 - Cho xem hàng, không cho thử
    * 2 - Cho phép thử
    * 3 - Không cho xem  hàng
    */
    allowTest: {
      type: 'number',
    },
    isBulkyGoods: {
      type: 'number',
      isIn: [0, 1],
      defaultsTo: 0,
    },

  },
  beforeCreate: (obj, next) => {
    Shipping.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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
  }
};

