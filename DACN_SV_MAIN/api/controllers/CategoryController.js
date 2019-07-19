module.exports = {
	create: async (req, res) => {
		// const { authorization } = req.headers

		const waitCreate = await sails.helpers.category.categoryCreate.with(req.body)

		return waitCreate ? res.ok(waitCreate) : res.badRequest()
	},

	read: async (req, res) => {
		const { id } = req.params

		let waitRead = null

		if (!id) {
			waitRead = await sails.helpers.category.categoryFind.with({ parentId: 'root' })

			for (let category of waitRead) {
				const waitChild = await sails.helpers.category.categoryFind.with({ parentId: category.id })
				if (waitChild)
					category['childs'] = waitChild;
			}
		}
		else waitRead = await sails.helpers.category.categoryFindOne.with({ id: id })
		if (!waitRead) return res.notFound()
		const waitChild = await sails.helpers.category.categoryFind.with({ parentId: waitRead.id })
		if (waitChild)
			waitRead['childs'] = waitChild;
		return waitRead ? res.ok(waitRead) : res.notFound()
	},

	update: async (req, res) => {
		if (!req.body.id) return res.badRequest()
		let dataToUpdate = {}
		const whitelist = ['name', 'description', 'parentId']
		for (let key in req.body) {

			if (whitelist.indexOf(key) < 0) continue
			const prop = req.body[key]
			if (prop) dataToUpdate[key] = prop
		}
		if (Object.entries(dataToUpdate).length < 1) {
			return res.badRequest()
		}

		const waitUpdate = await sails.helpers.category.categoryUpdate.with({ id: req.body.id, dataToUpdate })

		return waitUpdate ? res.ok(waitUpdate) : res.badRequest()
	},

	delete: async (req, res) => {
		// const { authorization } = req.headers

		if (!req.body.id) return res.badRequest()

		const waitDelete = await sails.helpers.category.categoryDestroy.with({ id: req.body.id })

		return waitDelete ? res.ok(waitDelete) : res.badRequest()
	},
}