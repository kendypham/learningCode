/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': true,

  'core/front/UserController': {
    // '*': true,
    'resetPassword': true,
    'forgotPassword': true,
    'confirm': true,
    'loginWithGoogle': true,
    'changePassword': ['isAuthorized'],
    'uploadAvatar': ['isAuthorized'],
    'read': ['isAuthorized'],
    'remove': ['isAdmin'],
    'profile': ['isAuthorized'],
    'update': ['isAuthorized'],
    'sendConfirmationEmail': ['isAuthorized'],
  },
};
