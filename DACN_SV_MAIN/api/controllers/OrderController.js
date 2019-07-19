/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //POST
    create: async (req, res) => {
        let list = []

        if (req.body.orderItemIds && req.body.location) {
            try {
                req.body.location = JSON.parse(req.body.location)
            } catch (err) { }
            const waitCreateLocation = await sails.helpers.location.locationCreate.with(req.body.location)
                ;
            if (!waitCreateLocation) return res.badRequest()
            req.body.locationId = waitCreateLocation.id
            try {
                req.body.orderItemIds = JSON.parse(req.body.orderItemIds)
            } catch (err) { }
            if (req.body.orderItemIds.length < 1) return res.badRequest()
            let dataToUpdate = {}
            let price = 0
            var createdBy = null
            console.log(req.body.orderItemIds)
            for (let id of req.body.orderItemIds) {
                const orderItem = await sails.helpers.orderitem.orderItemFindOne(id)
                console.log(orderItem)
                if (!orderItem || !orderItem.inCart) return res.badRequest('order item not allowed')
                const product = await sails.helpers.product.productFindOne.with({ id: orderItem.productId })
                dataToUpdate['inCart'] = false
                price += product.price * orderItem.quantity
                dataToUpdate['price'] = orderItem.price
                if (!createdBy) createdBy = orderItem.createdBy
                const waitupdate = await sails.helpers.orderitem.orderItemUpdate(id, dataToUpdate)
                if (waitupdate)
                    list.push(id)
                if (!product) return res.badRequest()
                dataToUpdate = {}
                dataToUpdate.quantity = product.quantity - waitupdate.quantity
                dataToUpdate.quantitySold = product.quantitySold < 0 ? waitupdate.quantity : product.quantitySold + waitupdate.quantity
                dataToUpdate.buyerNum = product.buyerNum + 1
                await sails.helpers.product.productUpdate.with({ id: waitupdate.productId, dataToUpdate })
            }
            req.body.orderItemIds = list;
            req.body.orderItemId = undefined;
            req.body.totalPrice = price
            req.body.createdBy = createdBy
            const waitCreate = await sails.helpers.order.orderCreate.with(req.body)
            if (waitCreate) {
                console.log('order created')
                await sails.helpers.orderhistory.orderHistoryCreate.with({ orderId: waitCreate.id, status: waitCreate.status })
                try {
                    sails.helpers.order.orderNotifySocket.with({ orderId: waitCreate.id, })
                } catch (e) {
                    console.log("notify err", e)
                }
            }
            return waitCreate ? res.ok(waitCreate) : res.badRequest()
        } else {
            return res.badRequest()
        }
    },

    read: async (req, res) => {
        const { id } = req.params

        let waitRead = null

        if (!id) {
            if (req.user.permission !== 'ADMIN') return req.forbidden()
            waitRead = await sails.helpers.order.orderFind()
            return waitRead ? res.ok(waitRead) : res.notFound()
        }
        else {
            waitRead = await sails.helpers.order.orderFindOne(id)
            return waitRead ? res.ok(waitRead) : res.notFound()

        }
    },
    update: async (req, res) => {
        var whitelist = ['status', 'firstName', 'lastName', 'emailAddress', 'phoneNumber', 'shipFee',
            'paymentMethod', 'totalPrice', 'description', 'carrierId', 'carrierServiceId', 'deliveryDate', 'weight', 'couponCode', 'paymentCode'];
        if (!req.user) {
            return res.forbidden();
        }
        if (!req.body.id) return res.badRequest()

        waitRead = await sails.helpers.order.orderFindOne(req.body.id)
        if (!waitRead) return res.badRequest()
        if (req.body.location) {
            try {
                await sails.helpers.location.locationUpdate.with({ id: waitRead.locationId, dataToUpdate: req.body.location })
            } catch (err) {
                return res.badRequest(err)
            }
        }

        let dataToUpdate = {}
        for (let key in req.body) {

            if (whitelist.indexOf(key) < 0) continue
            const prop = req.body[key]
            if (prop) dataToUpdate[key] = prop
        }
        if (Object.entries(dataToUpdate).length < 1) {
            return res.badRequest()
        }

        const waitUpdate = await sails.helpers.order.orderUpdate.with({ id: req.body.id, dataToUpdate: dataToUpdate })
        if (req.body.status && waitRead.status != req.body.status) {
            await sails.helpers.orderhistory.orderHistoryCreate.with({ orderId: waitUpdate.id, status: waitUpdate.status, description: req.body.reason ? req.body.reason : '' })
        }

        return waitUpdate ? res.ok(waitUpdate) : res.notFound()
    },

    delete: async (req, res) => {
        if (!req.body.id) return res.badRequest()
        try {
            waitRead = await sails.helpers.order.orderFindOneRaw.with({ id: req.body.id })
            await sails.helpers.location.locationDestroy.with({ id: waitRead.locationId })
        } catch (err) {
            return res.badRequest(err)
        }
        const waitDelete = await sails.helpers.order.orderDestroy.with({ id: req.body.id })
        await sails.helpers.orderhistory.orderHistoryDestroyByOrder.with({ orderId: req.body.id })

        return waitDelete ? res.ok(waitDelete) : res.badRequest()
    },

    findMyOrder: async (req, res) => {
        const id = req.user.id
        let waitRead = null

        waitRead = await sails.helpers.order.orderFindByUser.with({ createdBy: id })
        return waitRead ? res.ok(waitRead) : res.notFound()
    },

    updateList: async (req, res) => {
        errs = []
        success = []
        var whitelist = ['Confirming', 'Approved', 'Rejected', 'Canceled', 'On hold', 'Shipping', 'Delivered', 'Refunded'];
        try {
            req.body.ids = JSON.parse(req.body.ids)
        } catch (err) { }
        if (!req.body.ids || !req.body.status) return res.badRequest()
        if (whitelist.indexOf(req.body.status) < 0) return res.badRequest('"status" invalid')
        let dataToUpdate = {}
        for (let id of req.body.ids) {
            waitRead = await sails.helpers.order.orderFindOne(id)
            if (!waitRead) errs.push({ id: id, err: 'id not found' })
            dataToUpdate = {}
            if (waitRead.status != req.body.status) {
                dataToUpdate.status = req.body.status
                let tryCreate = await sails.helpers.order.orderUpdate.with({ id: id, dataToUpdate: dataToUpdate })
                if (!tryCreate) errs.push({ id: id, err: tryCreate })
                success.push(id)
                await sails.helpers.orderhistory.orderHistoryCreate.with({ orderId: id, status: req.body.status, description: req.body.reason ? req.body.reason : '' })
            }
        }
        return res.ok({ err: errs, success: success })
    },
};

