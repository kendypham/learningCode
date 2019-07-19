/**
 * Carrier.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'Carrier',
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
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    logo: {
      type: 'string',
    },
    /**
     * Danh sách các service cung cấp
     */
    serviceIds: {
      type: 'json',
      columnType: 'array',
    },
  },
  beforeCreate: (obj, next) => {
    Carrier.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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

