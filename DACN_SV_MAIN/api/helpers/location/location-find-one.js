module.exports = {
	inputs: {
		id: {
			type: 'string',
			unique: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await Location.findOne({ where: { id: id } })
		return exits.success(waitRead);
	}
}