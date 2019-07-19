/**
 * FavoriteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        req.body.userId = req.user.id
        const waitCreate = await sails.helpers.favorite.favoriteCreate.with(req.body)

        return waitCreate ? res.ok(waitCreate) : res.badRequest()
    },

    read: async (req, res) => {
        const { id, userId } = req.params
        let waitRead = null
        if (userId && req.user.permission === 'ADMIN')
            waitRead = await sails.helpers.favorite.favoriteFind.with({ userId: userId })
        else if (!id) {
            waitRead = await sails.helpers.favorite.favoriteFind.with({ userId: req.user.id })
        }
        else waitRead = await sails.helpers.favorite.favoriteFindOne.with({ id: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    delete: async (req, res) => {

        if (!req.body.productId) return res.badRequest()

        const waitDelete = await sails.helpers.favorite.favoriteDestroy.with({ productId: req.body.productId, userId: req.user.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },
}