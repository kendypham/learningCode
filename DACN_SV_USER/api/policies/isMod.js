/**
 * is Admin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any admin user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
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
    if (err) {
      return res.status(401).json({
        err: 'Invalid token'
      });
    }
    req.user = decoded.data;
    if (decoded.data.permission === 'MOD') {
      return next();
    }
    return res.status(401).json({
      err: 'You are not an MOD'
    });
  });
};