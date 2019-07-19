/**
 * ProductController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const fs = require('fs');
const url = require('url');
module.exports = {
	create: async (req, res) => {
		try {
			console.log(req.body)
			req.body.data = JSON.parse(req.body.data)
		} catch (e) { }
		const { imageLinks } = req.body.data
		if (!req.body.data.categoryId) return res.badRequest()

		const waitReadCategory = await sails.helpers.category.categoryFindOne.with({ id: req.body.data.categoryId })
		if (!waitReadCategory) return res.badRequest()

		const waitCreate = await sails.helpers.product.productCreate.with(req.body.data)

		let images = []
		if (imageLinks) {
			var arr = imageLinks
			try {
				arr = JSON.parse(imageLinks)
			} catch (e) { }
			if (arr.length > 0) {
				let linksCnt = 0

				if (arr.length > 5) linksCnt = 5
				else linksCnt = arr.length

				for (let i = 0; i < linksCnt; i++) {
					const myURL = url.parse(arr[i]);
					if (myURL.hostname) {
						const waitCreateImg = await sails.helpers.image.imageEntryCreate.with({ productId: waitCreate.id, url: arr[i] })
						if (!waitCreateImg) return res.serverError()
						images.push(waitCreateImg)
					}
				}
				if (images.length == 0) {
					await sails.helpers.product.productDestroy.with({ id: waitCreate.id })
					return res.badRequest();
				}
				waitCreate['images'] = images
				return res.ok(waitCreate)
			} else {
				await sails.helpers.product.productDestroy.with({ id: waitCreate.id })
				return res.badRequest();
			}
		} else {
			req.file('productImg').upload({}, async (err, uploadedFiles) => {
				if (err) return res.serverError(err)
				if (waitCreate && uploadedFiles.length > 0) {
					for (let i = 0; i < uploadedFiles.length; i++) {
						if (images.length <= 5) {
							if (!uploadedFiles[i].fd) return res.serverError()
							const imgURL = await sails.helpers.image.imageUpload.with({ file: uploadedFiles[i].fd })
							if (!imgURL) return res.serverError()
							const waitCreateImg = await sails.helpers.image.imageEntryCreate.with({ productId: waitCreate.id, url: imgURL })
							if (!waitCreateImg) return res.serverError()
							images.push(waitCreateImg)
						}
						await destroyFile(uploadedFiles[i].fd)
					}
					waitCreate['images'] = images

					return res.ok(waitCreate)
				} else {

					await sails.helpers.product.productDestroy.with(waitCreate.id)
					return res.badRequest(err);
				}
			})
		}

	},

	read: async (req, res) => {
		const { id } = req.params
		console.log(req.params)
		const { limit, categoryId, skip, price } = req.query
		let waitRead = null
		var mLimit = limit ? limit : 1000;
		var mSkip = skip ? skip : 0;
		var mCategoryId = categoryId ? categoryId : '';
		var attrs = null
		var maxPrice, minPrice = -1
		try {
			attrs = price ? price.split('-') : null
			minPrice = attrs && attrs[0] ? parseInt(attrs[0], 10) : -1
			maxPrice = attrs && attrs[1] ? parseInt(attrs[1], 10) : -1
		} catch (e) {

		}
		if (!id) {

			waitRead = await sails.helpers.product.productFind.with({ limit: mLimit, skip: mSkip, categoryId: mCategoryId, minPrice: minPrice, maxPrice: maxPrice })
			if (waitRead) {
				for (let i = 0; i < waitRead.length; i++) {
					const images = await sails.helpers.image.imageEntryFind.with({ productId: waitRead[i].id })
					if (images) waitRead[i]['images'] = images
					// const rating = await sails.helpers.rating.ratingFind.with({ productId: waitRead[i].id })
					// if (images) waitRead[i]['images'] = images
					if (req.user && req.user.id) {
						const fav = await sails.helpers.favorite.favoriteFindOneByUser.with({ productId: waitRead[i].id, userId: req.user.id })
						waitRead[i]['favourite'] = fav ? true : false
						// const rated = await sails.helpers.rating.ratingFindByUser.with({ productId: waitRead[i].id, userId: req.user.id })
						// waitRead[i]['rated'] = rated ? true : false
					}
				}
				return res.ok(waitRead)
			}
			else return res.notFound("empty")
		}
		else {
			console.log(1)
			waitRead = await sails.helpers.product.productFindOne.with({ id: id })
			if (waitRead) {
				const images = await sails.helpers.image.imageEntryFind.with({ productId: waitRead.id })
				if (images) waitRead['images'] = images

				if (req.user && req.user.id) {
					const fav = await sails.helpers.favorite.favoriteFindOneByUser.with({ productId: waitRead.id, userId: req.user.id })
					waitRead['favourite'] = fav ? true : false
					const rated = await sails.helpers.rating.ratingFindOneByUser.with({ productId: waitRead.id, userId: req.user.id })
					if (rated) {
						rated.productId = undefined
						rated.userId = undefined
						waitRead['rated'] = rated.rating
					}
				}

				return res.ok(waitRead)

			}
			else return res.notFound("idNotFound")
		}
	},

	update: async (req, res) => {
		if (!req.body.id) return res.badRequest()
		let dataToUpdate = {}
		const whitelist = ['oldPrice', 'description', 'listRating', 'name', 'categoryId',
			'quantity', 'price', 'color', 'seller', 'hide', 'showHot', 'showHome', 'width', 'warrantyMonth', 'weight', 'buyerNum'];
		for (let key in req.body) {

			if (whitelist.indexOf(key) < 0) continue
			const prop = req.body[key]
			if (prop) dataToUpdate[key] = prop
		}

		if (Object.entries(dataToUpdate).length > 1) {
			const waitUpdate = await sails.helpers.product.productUpdate.with({ id: req.body.id, dataToUpdate })
			if (!waitUpdate) return res.serverError()
			return res.ok(waitUpdate)
		}

		return res.badRequest("idNotFound")
	},

	updateImages: async (req, res) => {
		try {
			req.body.data = JSON.parse(req.body.data)
		} catch (e) { }
		if (!req.body.data) return res.badRequest()
		req.file('updateImg').upload({}, async (err, uploadedFiles) => {
			if (err) return res.serverError(err)

			const { id } = req.body.data
			let oldImgUrls = req.body.data.oldImgUrls ? req.body.data.oldImgUrls : []

			const imgEntries = await sails.helpers.image.imageEntryFind.with({ productId: id })

			let freeCreateSlots = imgEntries ? 5 - imgEntries.length : 5
			if (imgEntries)
				imgEntries.map(async item => {
					if (oldImgUrls.indexOf(item.id) === -1) {
						await sails.helpers.image.imageFcsDestroy.with({ fileName: item.url })
						await sails.helpers.image.imageEntryDestroy.with({ id: item.id })
						freeCreateSlots++;
					}
				})
			if (uploadedFiles.length > 0) {
				for (let i = 0; i < uploadedFiles.length; i++) {
					if (i + 1 <= freeCreateSlots) {
						if (!uploadedFiles[i].fd) return res.serverError()
						const imgURL = await sails.helpers.image.imageUpload.with({ file: uploadedFiles[i].fd })
						if (!imgURL) return res.serverError()
						const waitCreateImg = await sails.helpers.image.imageEntryCreate.with({ productId: id, url: imgURL })
						if (!waitCreateImg) return res.serverError()
					}
					await destroyFile(uploadedFiles[i].fd)
				}

			}
			return res.ok()
		})
	},

	delete: async (req, res) => {
		if (!req.body.id) return res.badRequest()

		const waitFindEntries = await sails.helpers.image.imageEntryFind.with({ productId: req.body.id })
		if (waitFindEntries.length > 0) {
			await asyncForEach(waitFindEntries, async (entry) => {
				// const entryFilename = url.parse(entry.url).pathname.split('/')[5]
				const waitDeleteOnFB = await sails.helpers.image.imageFcsDestroy.with({ fileName: entry.url })
				if (waitDeleteOnFB && waitDeleteOnFB !== -1) {
					await sails.helpers.image.imageEntryDestroy.with({ id: entry.id })
				}
			})
		}

		const waitDelete = await sails.helpers.product.productDestroy.with({ id: req.body.id })
		return waitDelete ? res.ok(waitDelete) : res.badRequest()
	},
	search: async (req, res) => {
		const { q } = req.query
		console.log(req.query.q)
		if (!q || String(q).length < 1) return res.badRequest('search keywords empty')
		// const findProducts = await Product.find({
		// 	or: [
		// 		{ name: { contains: q } },
		// 		{ description: { contains: q } }
		// 	]
		// });

		var query = [
			{
				"$match": {
					$or: [
						{ 'name': { $regex: new RegExp(q.toLowerCase(), "i") } },
						{ 'description': { $regex: new RegExp(q.toLowerCase(), "i") } }
					]
				}
			},
		];

		const findProducts = await nativeService.search(query)
		console.log("xx", findProducts)
		if (findProducts) {
			for (let i = 0; i < findProducts.length; i++) {
				findProducts[i].id = String(findProducts[i]._id)
				const images = await sails.helpers.image.imageEntryFind.with({ productId: findProducts[i].id })
				if (images) findProducts[i]['images'] = images
				if (req.user && req.user.id) {
					const fav = await sails.helpers.favorite.favoriteFindOneByUser.with({ productId: findProducts[i].id, userId: req.user.id })
					findProducts[i]['favourite'] = fav ? true : false
				}
			}
			return res.ok(findProducts)
		}
		else return res.notFound("empty")
	},
}

function destroyFile(path) {
	fs.unlink(path, function (error) {
		console.log("error destroy file ", error);
	})
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}