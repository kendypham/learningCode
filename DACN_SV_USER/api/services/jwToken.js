/**
 * Service to generate JWT
 */
var jwt = require('jsonwebtoken');

module.exports = {
	'sign': function (payload, expired = "30d") {
		return jwt.sign({
			data: payload
		}, sails.config.secret, {
				expiresIn: expired
			});
	},

	'verify': function (token, callback) {
		jwt.verify(token, sails.config.secret, callback);
	}
};