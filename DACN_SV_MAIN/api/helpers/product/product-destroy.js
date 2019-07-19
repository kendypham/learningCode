module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		waitRead = await sails.helpers.product.productFindOne.with({ id: id })

		// if (waitRead) {
		// 	const images = await sails.helpers.image.imageEntryFind.with({ productId: waitRead.id })
		// 	for (let img of images) {
		// 		await sails.helpers.image.imageFcsDestroy.with({ fileName: img.url })
		// 	}
		// }

		const waitDelete = await Product.destroyOne({ id })
		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}