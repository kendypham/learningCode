module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
		dataToUpdate: {
			type: 'ref',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		const { id } = inputs

		const waitUpdate = await Category.updateOne({ id }).set(inputs.dataToUpdate)

		return exits.success(waitUpdate);
	}
}