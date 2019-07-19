
/**
 * OrderItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {
        if (!req.user) {
            req.body.createdBy = ''
        } else if (req.user.permission === "ADMIN" && req.body.userId) {
            if (!req.body.createdBy)
                req.body.createdBy = req.user.id;
        } else {
            req.body.createdBy = req.user.id;
        }

        if (!req.body.productId || req.body.productId.length < 1 || !req.body.quantity) return res.badRequest()
        const waitReadProduct = await sails.helpers.product.productFindOne.with({ id: req.body.productId })
        if (!waitReadProduct) return res.notFound("idNotFound");
        req.body.price = waitReadProduct.price;
        req.body.productName = waitReadProduct.name;
        if (parseInt(req.body.quantity, 10) > waitReadProduct.quantity)
            return res.badRequest(waitReadProduct.quantity + " products left")
        const waitCreate = await sails.helpers.orderitem.orderItemCreate.with(req.body)

        return waitCreate ? res.ok(waitCreate) : res.badRequest()
    },

    read: async (req, res) => {
        const { id } = req.params

        let waitRead = null

        if (!id) {
            if (req.user.permission !== 'ADMIN') return req.forbidden()
            waitRead = await sails.helpers.orderitem.orderItemFind()
            return waitRead ? res.ok(waitRead) : res.notFound()
        }
        else {
            waitRead = await sails.helpers.orderitem.orderItemFindOne(id)
            return waitRead ? res.ok(waitRead) : res.notFound()
        }

    },

    update: async (req, res) => {
        if (!req.user) {
            req.body.userId = ''
        } else if (req.user.permission === "ADMIN" && req.body.userId) {
        } else {
            req.body.userId = req.user.id;
        }
        if (!req.body.id) return res.badRequest()
        let dataToUpdate = {}
        const whitelist = ['quantity'];
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }
        if (Object.entries(dataToUpdate).length < 1) {
            return res.badRequest()
        }

        const waitUpdate = await sails.helpers.orderitem.orderItemUpdate.with({ id: req.body.id, dataToUpdate })

        return waitUpdate ? res.ok(waitUpdate) : res.notFound()
    },

    delete: async (req, res) => {
        if (!req.body.id) return res.badRequest()

        const waitDelete = await sails.helpers.orderitem.orderItemDestroy.with({ id: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },

    findMyOrderItem: async (req, res) => {
        const id = req.user.id
        let waitRead = await sails.helpers.orderitem.orderItemFindByUser.with({ createdBy: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

};

