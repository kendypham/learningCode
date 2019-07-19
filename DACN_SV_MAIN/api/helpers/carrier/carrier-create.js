module.exports = {
	inputs: {
		name: {
			type: 'string',
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
	fn: async (inputs, exits) => {

		const waitCreate = await Carrier.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}