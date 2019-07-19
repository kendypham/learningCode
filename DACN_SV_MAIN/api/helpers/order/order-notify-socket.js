var request = require('request');

module.exports = {
	inputs: {
		orderId: {
			type: 'string',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		const { orderId } = inputs
		request.post(
			{
				url: 'http://localhost:1340/new-order',
				timeout: 1000,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ orderId })
			},
			(err, res, body) => {
				if (err) console.error(err)
			}
		)

	},
}