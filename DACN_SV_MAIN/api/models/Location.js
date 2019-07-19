/**
 * Location.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'Location',
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
    city: {
      type: 'string',
      required: true
    },
    district: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    location: {
      type: 'json',
      custom: function (value) {
        return _.isObject(value) &&
          !_.isNull(value.lat) && !_.isNull(value.lon) &&
          value.lat !== Infinity && value.lat !== -Infinity &&
          value.lon !== Infinity && value.lon !== -Infinity;
      }
    },
  },
  beforeCreate: (obj, next) => {
    Location.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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


