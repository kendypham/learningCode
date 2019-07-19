module.exports = {
	inputs: {
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
	fn: async (inputs, exits) => {

		const waitCreate = await Location.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}