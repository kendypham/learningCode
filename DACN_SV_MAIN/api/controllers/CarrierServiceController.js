/**
 * CarrierServiceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        const waitCreate = await sails.helpers.carrierservice.carrierServiceCreate.with(req.body)
        return waitCreate ? res.ok(waitCreate) : res.badRequest()
    },

    read: async (req, res) => {
        const { id } = req.params

        let waitRead = null

        if (!id) {
            waitRead = await sails.helpers.carrierservice.carrierServiceFind()
        }
        else waitRead = await sails.helpers.carrierservice.carrierServiceFindOne.with({ id: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    update: async (req, res) => {
        if (!req.body.id) return res.badRequest()
        let dataToUpdate = {}
        const whitelist = ['name', 'shipFee']
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }
        if (Object.entries(dataToUpdate).length < 1) {
            return res.badRequest()
        }

        const waitUpdate = await sails.helpers.carrierservice.carrierServiceUpdate.with({ id: req.body.id, dataToUpdate })

        return waitUpdate ? res.ok(waitUpdate) : res.badRequest()
    },

    delete: async (req, res) => {
        // const { authorization } = req.headers

        if (!req.body.id) return res.badRequest()

        const waitDelete = await sails.helpers.carrierservice.carrierServiceDestroy.with({ id: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },
}