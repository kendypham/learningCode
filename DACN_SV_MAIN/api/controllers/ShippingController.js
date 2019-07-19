/**
 * ShippingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {

    if (req.body.orderId) {
      const { orderId } = req.body
      let dataToUpdate = {}
      dataToUpdate['status'] = "Shipping"
      const waitUpdateOrder = await sails.helpers.order.orderUpdate.with({ id: orderId, dataToUpdate: dataToUpdate })
      if (!waitUpdateOrder) return res.badRequest()
      const waitCreate = await sails.helpers.shipping.shippingCreate.with(req.body)
      waitCreate.order = waitUpdateOrder
      if (waitCreate) {
        await sails.helpers.shippinghistory.shippingHistoryCreate.with({ shippingId: waitCreate.id, status: waitCreate.status })
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
      waitRead = await sails.helpers.shipping.shippingFind()
      return waitRead ? res.ok(waitRead) : res.notFound()
    }
    else {
      waitRead = await sails.helpers.shipping.shippingFindOne(id)
      return waitRead ? res.ok(waitRead) : res.notFound()
    }

  },

  update: async (req, res) => {
    var whitelist = ['status', 'from', 'codMoney', 'allowTest', 'isBulkyGoods'];
    if (!req.user) {
      return res.forbidden();
    }
    if (!req.body.id) return res.badRequest()

    if (req.body.order) {
      try {
        waitRead = await sails.helpers.shipping.shippingFindOne(req.body.id)
        if (req.body.status && waitRead.status != req.body.status) {
          await sails.helpers.shippinghistory.shippingHistoryCreate.with({ shippingId: waitUpdate.id, status: waitUpdate.status, description: req.body.reason ? req.body.reason : '' })
        }
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

    const waitUpdate = await sails.helpers.shipping.shippingUpdate.with({ id: req.body.id, dataToUpdate })

    return waitUpdate ? res.ok(waitUpdate) : res.notFound()
  },

  delete: async (req, res) => {
    if (!req.body.id) return res.badRequest()
    const waitDelete = await sails.helpers.shipping.shippingDestroy.with({ id: req.body.id })
    await sails.helpers.shippinghistory.shippingHistoryDestroyByShipping.with({ shippingId: req.body.id })

    return waitDelete ? res.ok(waitDelete) : res.badRequest()
  },

  manualShippingDirections: async (req, res) => {
    if (!req.body.shippingIds) return res.badRequest()
    const locations = req.body.shippingIds
    var result = await tryDirections(locations)
    console.log("Ket qua", result)
    return res.ok(result)
  },

  smartShippingDirections: async (req, res) => {
    if (!req.body.shippingIds || !req.body.k) return res.badRequest()
    const locations = req.body.shippingIds
    let data = locations.map((location) => {
      let tmp = [location.lat, location.lng]
      return tmp;
    });
    var rs = Utils.skmeans(data, req.body.k);
    groups = [];
    let i = 0
    rs.idxs.map((item) => {
      if (!groups[item])
        groups[item] = []
      groups[item].push(data[i])
      i++;
    })
    result = [];
    for (let i = 0; i < groups.length; i++) {
      let tmp = await tryDirections(groups[i])
      result.push(tmp)
    }
    return res.ok(result)
  }
}
async function tryDirections(locations) {
  let optimize = []

  let marker;
  let request = {
    mode: 'walking',
    optimize: true
  };

  for (let i = 0; i < locations.length; i++) {
    marker = {
      lat: locations[i][0] ? locations[i][0] : locations[i].lat,
      lng: locations[i][1] ? locations[i][1] : locations[i].lng
    }
    if (i == 0) request.origin = marker;
    else {
      if (!request.waypoints) request.waypoints = [];
      request.waypoints.push(marker);
    }
  }
  if (locations.length === 2) {
    request.destination = request.waypoints[0];
    // request.waypoints = []
    console.log("xxxxxxxxx", locations)
    console.log("xxxxxxxxx", request)
  }
  else
    request.destination = request.origin;
  let directions = await MapApiService.directions(request)
  optimize[0] = locations[0]
  if (directions.json.status === Constants.OK) {
    for (let i = 0; i < directions.json.routes[0].waypoint_order.length; i++) {
      optimize.push(locations[directions.json.routes[0].waypoint_order[i] + 1])
    }
  } else {
    console.log(directions)
  }
  return {
    raw: directions.json,
    optimize: optimize
  }
}