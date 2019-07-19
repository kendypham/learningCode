/**
 * OrderHistoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        const waitCreate = await sails.helpers.orderhistory.orderHistoryCreate.with(req.body)
        return waitCreate ? res.ok(waitCreate) : res.badRequest()
    },

    read: async (req, res) => {
        const { id, orderId } = req.params

        let waitRead = null

        if (!id && !orderId) {
            waitRead = await sails.helpers.orderhistory.orderHistoryFind()
        } else if (orderId)
            waitRead = await sails.helpers.orderhistory.orderHistoryFindByOrder.with({ orderId: orderId })
        else waitRead = await sails.helpers.orderhistory.orderHistoryFindOne.with({ id: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    update: async (req, res) => {
        if (!req.body.id) return res.badRequest()
        let dataToUpdate = {}
        const whitelist = ['description', 'status']
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

        const waitUpdate = await sails.helpers.orderhistory.orderHistoryUpdate.with({ id: req.body.id, dataToUpdate })

        return waitUpdate ? res.ok(waitUpdate) : res.badRequest()
    },

    delete: async (req, res) => {

        if (!req.body.id) return res.badRequest()

        const waitDelete = await sails.helpers.orderhistory.orderHistoryDestroy.with({ id: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },
}