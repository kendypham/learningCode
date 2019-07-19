/**
 * RatingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        try {
            req.body.userId = req.user.id
            // console.log(0, req.body.productId)
            if (!req.body.productId && !req.body.rating) return res.badRequest('data invalid');
            try { req.body.rating = parseInt(req.body.rating, 10) }
            catch (e) {
                return res.badRequest('parse err');
            }
            product = await sails.helpers.product.productFindOne.with({ id: req.body.productId })
            // console.log("xxx", product)
            if (!product.listRating)
                product.listRating = []
            if (product.listRating.indexOf(req.user.id) > -1) res.badRequest('You have already rated this product')
            // console.log(3)
            dataToUpdate = {}
            dataToUpdate.rating = (product.rating * product.listRating.length + req.body.rating) / (product.listRating.length + 1)

            product.listRating.push(req.user.id)
            dataToUpdate.listRating = product.listRating
            const productUpdate = await sails.helpers.product.productUpdate.with({ id: req.body.productId, dataToUpdate })

            const waitCreate = await sails.helpers.rating.ratingCreate.with(req.body)
            // console.log(1)
            return (waitCreate && productUpdate) ? res.ok(productUpdate) : res.badRequest()
        } catch (e) {
            console.log(e)
            res.badRequest(e)
        }
    },

    read: async (req, res) => {
        const { id } = req.params

        let waitRead = null
        if (!id) {
            waitRead = await sails.helpers.rating.ratingFind()
        }
        else waitRead = await sails.helpers.rating.ratingFindOne.with({ id: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    update: async (req, res) => {
        if (!req.body.id) return res.badRequest()
        let dataToUpdate = {}
        const whitelist = ['userId', 'productId', 'rating', 'content']
        if (req.body != null && !Utils.checkUrlValid(logo))
            return res.badRequest()
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }
        if (Object.entries(dataToUpdate).length < 1) {
            return res.badRequest()
        }

        const waitUpdate = await sails.helpers.rating.ratingUpdate.with({ id: req.body.id, dataToUpdate })

        return waitUpdate ? res.ok(waitUpdate) : res.badRequest()
    },

    delete: async (req, res) => {

        if (!req.body.id) return res.badRequest()

        const waitDelete = await sails.helpers.rating.ratingDestroy.with({ id: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },
}