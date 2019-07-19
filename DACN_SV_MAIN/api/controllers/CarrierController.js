/**
 * CarrierController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async (req, res) => {
        if (req.body.logo != null && !Utils.checkUrlValid(req.body.logo))
            return res.badRequest()
        try {
            req.body.serviceIds = JSON.parse(req.body.serviceIds)
        } catch (e) { }

        const waitCreate = await sails.helpers.carrier.carrierCreate.with(req.body)

        return waitCreate ? res.ok(waitCreate) : res.badRequest()
    },

    read: async (req, res) => {
        const { id } = req.params

        let waitRead = null

        if (!id) {
            waitRead = await sails.helpers.carrier.carrierFind()
        }
        else waitRead = await sails.helpers.carrier.carrierFindOne.with({ id: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    update: async (req, res) => {
        if (!req.body.id) return res.badRequest()
        let dataToUpdate = {}
        const whitelist = ['name', 'logo', 'serviceIds']
        if (req.body.logo != null && !Utils.checkUrlValid(req.body.logo))
            return res.badRequest()
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }
        if (Object.entries(dataToUpdate).length < 1) {
            return res.badRequest()
        }

        const waitUpdate = await sails.helpers.carrier.carrierUpdate.with({ id: req.body.id, dataToUpdate })

        return waitUpdate ? res.ok(waitUpdate) : res.badRequest()
    },

    delete: async (req, res) => {

        if (!req.body.id) return res.badRequest()

        const waitDelete = await sails.helpers.carrier.carrierDestroy.with({ id: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },
}