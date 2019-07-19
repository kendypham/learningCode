/**
 * is authenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
  console.log("auth log");
  var token;
  //Check if authorization header is present
  if (req.headers && req.headers.authorization) {
    //authorization header is present
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({
        err: 'Format is Authorization: Bearer [token]'
      });
    }
  } else {
    //authorization header is not present
    return res.status(401).json({
      err: 'No Authorization header was found'
    });
  }
  jwToken.verify(token, function (err, decoded) {
    console.log("decoded:", decoded);

    if (err) {
      return res.status(401).json({
        err: err
      });
    }
    req.user = decoded.data;
    return next();
  });
};