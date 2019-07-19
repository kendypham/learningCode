module.exports = {
	inputs: {
		name: {
			type: 'string',
			required: true
		},
		shipFee: {
			type: 'number',
			defaultsTo: 1000,
		},
	},
	fn: async (inputs, exits) => {

		const waitCreate = await CarrierService.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}