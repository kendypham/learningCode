module.exports = {
	inputs: {
		id: {
			type: 'string',
			unique: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await Carrier.findOne({ id })
		return exits.success(waitRead);
	}
}