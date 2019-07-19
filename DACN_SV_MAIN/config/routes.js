/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
    // Product
    'GET /product/:id': 'ProductController.read',
    'GET /product': 'ProductController.read',
    'GET /search': 'ProductController.search',
    'POST /product/create': 'ProductController.create',
    'PATCH /product/update': 'ProductController.update',
    'POST /product/update-images': 'ProductController.updateImages',
    'DELETE /product/delete': 'ProductController.delete',
    // Category
    'GET /category/:id': 'CategoryController.read',
    'GET /category': 'CategoryController.read',
    'POST /category/create': 'CategoryController.create',
    'PATCH /category/update': 'CategoryController.update',
    'DELETE /category/delete': 'CategoryController.delete',
    //Carrier
    'GET /carrier/:id': 'CarrierController.read',
    'GET /carrier': 'CarrierController.read',
    'POST /carrier/create': 'CarrierController.create',
    'PATCH /carrier/update': 'CarrierController.update',
    'DELETE /carrier/delete': 'CarrierController.delete',
    //CarrierService
    'GET /carrier-service/:id': 'CarrierServiceController.read',
    'GET /carrier-service': 'CarrierServiceController.read',
    'POST /carrier-service/create': 'CarrierServiceController.create',
    'PATCH /carrier-service/update': 'CarrierServiceController.update',
    'DELETE /carrier-service/delete': 'CarrierServiceController.delete',
    //Order
    'GET /order/:id': 'OrderController.read',
    'GET /order': 'OrderController.read',
    'POST /order/create': 'OrderController.create',
    'POST /order/update-list': 'OrderController.updateList',
    'GET /order/me': 'OrderController.findMyOrder',
    'PATCH /order/update': 'OrderController.update',
    'DELETE /order/delete': 'OrderController.delete',
    //Order Item
    'GET /order-item/:id': 'OrderItemController.read',
    'GET /order-item': 'OrderItemController.read',
    'GET /order-item/me': 'OrderItemController.findMyOrderItem',
    'POST /order-item/create': 'OrderItemController.create',
    'PATCH /order-item/update': 'OrderItemController.update',
    'DELETE /order-item/delete': 'OrderItemController.delete',
    //Shipping
    'GET /shipping/:id': 'ShippingController.read',
    'GET /shipping': 'ShippingController.read',
    'POST /shipping/create': 'ShippingController.create',
    'PATCH /shipping/update': 'ShippingController.update',
    'DELETE /shipping/delete': 'ShippingController.delete',
    'POST /shipping/manual-shipping-directions': 'ShippingController.manualShippingDirections',
    'POST /shipping/smart-shipping-directions': 'ShippingController.smartShippingDirections',
    //Order History
    'GET /order-history/:id': 'OrderHistoryController.read',
    'GET /order-history': 'OrderHistoryController.read',
    'POST /order-history/create': 'OrderHistoryController.create',
    'PATCH /order-history/update': 'OrderHistoryController.update',
    'DELETE /order-history/delete': 'OrderHistoryController.delete',
    //Rating
    'GET /rating/:id': 'RatingController.read',
    'GET /rating': 'RatingController.read',
    'POST /rating/create': 'RatingController.create',
    'PATCH /rating/update': 'RatingController.update',
    'DELETE /rating/delete': 'RatingController.delete',
    //Favorite
    'GET /favorite/:id': 'FavoriteController.read',
    'GET /favorite': 'FavoriteController.read',
    'POST /favorite/create': 'FavoriteController.create',
    'DELETE /favorite/delete': 'FavoriteController.delete',

    //Analyst
    'GET /analyst': 'AnalystController.read',
}
