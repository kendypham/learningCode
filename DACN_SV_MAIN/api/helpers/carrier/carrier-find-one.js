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
		try {

			waitRead.services = []
			for (let id of waitRead.serviceIds) {
				const waitReadDetail = await sails.helpers.carrierservice.carrierServiceFindOne.with({ id: id })
				if (waitReadDetail)
					waitRead.services.push(waitReadDetail)
			}
			waitRead.serviceIds = undefined
			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}