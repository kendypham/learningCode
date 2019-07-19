module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {

		let waitRead = await Carrier.find({ where: {} })

		try {
			for (let carrier of waitRead) {
				carrier.services = []
				try {
					carrier.services = []
					console.log(carrier.serviceIds);
					for (let id of carrier.serviceIds) {
						console.log(id);
						const waitReadDetail = await sails.helpers.carrierservice.carrierServiceFindOne.with({ id: id })
						if (waitReadDetail)
							carrier.services.push(waitReadDetail)
					}

				} catch (err) {
					return exits.error(err);
				}
				carrier.serviceIds = undefined
			}
			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}