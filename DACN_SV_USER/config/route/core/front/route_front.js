module.exports.routes = {
    // USER
    'POST   /login': 'core/front/UserController.login',
    '/login': 'core/front/UserController.login',
    'POST /reset-password': 'core/front/UserController.resetPassword',
    'POST /forgot-password': 'core/front/UserController.forgotPassword',
    'POST   /change-password': 'core/front/UserController.changePassword',
    'GET /user/:id': 'core/front/UserController.read',
    'GET /users': 'core/front/UserController.read',
    'GET    /user/profile': 'core/front/UserController.profile',
    'GET   /request-email-confirm': 'core/front/UserController.sendConfirmationEmail',
    'GET    /user/remove/:id': 'core/front/UserController.remove',
    'GET   /confirm-email': 'core/front/UserController.confirm',
    'PATCH   /user/update': 'core/front/UserController.update',
    'POST   /signup': 'core/front/UserController.signup',
    'POST   /create-admin': 'core/front/UserController.createAdmin',
    'POST   /login-with-google': 'core/front/UserController.loginWithGoogle',
    'POST   /user/upload-avatar': 'core/front/UserController.uploadAvatar',
}