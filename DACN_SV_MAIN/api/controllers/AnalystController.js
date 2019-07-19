/**
 * AnalystController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    read: async (req, res) => {
        var results = {}
        var today = new Date()
        var start = new Date(today.getFullYear(), today.getMonth());
        start.setDate(start.getDate() + 1);
        var end = new Date(today.getFullYear(), today.getMonth() + 1);
        //Shipping
        const shippingCount = await Shipping.count({
            status: ['Shipping', 'Out For Deliveryth'],
            updatedAt: { '>=': start, '<': end }
        })
        results.shippingCount = shippingCount ? shippingCount : 0
        //Orders
        const orderCount = await Order.count({
            updatedAt: { '>=': start }
        })
        results.orderCount = orderCount ? orderCount : 0
        //income total
        var income = 0
        const orderRead = await Order.find({
            // status: ['Approved', 'Shipping', 'Delivered', 'Paid'],
            updatedAt: { '>=': start, '<': end }
        }).sort([
            { createdAt: 'DESC' },
        ]);

        var currentOrders = []
        for (let item of orderRead) {
            income += item.totalPrice
            if (currentOrders.length < 10) {
                currentOrders.push(item)
            }
        }
        results.totalIncome = income
        results.currentOrders = currentOrders
        //top 5 sales
        var query = [
            // { $limit: 5 },
            {
                "$match": {
                    "createdAt": {
                        "$gte": start.valueOf(),
                    },
                    "inCart": false
                }
            },
            {
                "$group": {
                    "_id": "$productId",
                    "quantity": {
                        "$sum": {
                            "$sum": "$quantity"
                        }
                    }
                }
            },
            {
                "$project": {
                    "productId": "$_id",
                    "quantity": "$quantity",
                    "_id": 0
                }
            },
            {
                '$sort': {
                    'quantity': -1
                }
            }
        ];

        const data = await nativeService.query(query)
        results.topSales = []
        console.log("kq", data)
        if (data)
            for (let item of data) {
                if (results.topSales.length > 9) break
                const product = await sails.helpers.product.productFindOne.with({ id: item.productId })
                if (product) {
                    var tmp = {}
                    tmp.quantity = item.quantity
                    tmp.id = product.id
                    tmp.name = product.name
                    results.topSales.push(tmp)
                }
            }

        //Chart

        var phoneList = []
        var laptopList = []
        var tabletList = []
        var others = []

        var phoneCat = await Category.findOne({ where: { name: 'Phone' } })
        var laptopCat = await Category.findOne({ where: { name: 'Laptop' } })
        var tabletCat = await Category.findOne({ where: { name: 'Tablet' } })

        if (!phoneCat || !laptopCat || !tabletCat) return res.badRequest('Category Data err')
        var max = 0;
        for (let i = 0; i < 6; i++) {
            const newStart = new Date(today.getFullYear(), today.getMonth() - i);
            newStart.setDate(newStart.getDate() + 1);
            const newEnd = new Date(today.getFullYear(), today.getMonth() + 1 - i);
            //Statistics of phone numbers sold in 6 months
            const orderItems = await OrderItem.find({
                updatedAt: { '>=': newStart, '<': newEnd },
                inCart: false
            })
            var phoneCount = 0
            var tabletCount = 0
            var laptopCount = 0
            var otherCount = 0
            for (let item of orderItems) {
                try {
                    const productRead = await Product.findOne({
                        id: item.productId
                    })
                    if (!productRead) continue
                    if (productRead.categoryId === phoneCat.id) {
                        phoneCount += item.quantity
                    }
                    else if (productRead.categoryId === tabletCat.id)
                        tabletCount += item.quantity
                    else if (productRead.categoryId === laptopCat.id)
                        laptopCount += item.quantity
                    else
                        otherCount += item.quantity
                } catch (e) {
                    console.log(e)
                }

            }
            max = max < phoneCount ? phoneCount : max
            max = max < tabletCount ? tabletCount : max
            max = max < laptopCount ? laptopCount : max
            max = max < otherCount ? otherCount : max
            phoneList.push({
                key: newStart.getFullYear() + '-' + (newStart.getMonth() + 1),
                value: phoneCount
            })
            //Statistics of Tablet numbers sold in 6 months

            tabletList.push({
                key: newStart.getFullYear() + '-' + (newStart.getMonth() + 1),
                value: tabletCount
            })
            //Statistics of phone numbers sold in 6 months

            laptopList.push({
                key: newStart.getFullYear() + '-' + (newStart.getMonth() + 1),
                value: laptopCount
            })

            //Statistics of phone numbers sold in 6 months

            others.push({
                key: newStart.getFullYear() + '-' + (newStart.getMonth() + 1),
                value: otherCount
            })

        }
        results.max = max
        results.chart = {}
        results.chart.phoneList = phoneList
        results.chart.laptopList = laptopList
        results.chart.tabletList = tabletList
        results.chart.others = others

        return results ? res.ok(results) : res.badRequest()
    },
};

