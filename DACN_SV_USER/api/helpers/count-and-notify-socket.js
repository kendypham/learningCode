const request = require('request')

module.exports = {
	inputs: {},

	fn: async () => {
		const userCount = await User.count()
		request.post(
			{
				url: 'http://localhost:1340/user-count',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({userCount})
			},
			(err, res, body) => {
				if (err) console.error(err)
				if (body) console.log(body)
			}
		)
	}
}