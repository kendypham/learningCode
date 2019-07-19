// EmailService.js

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: sails.config.project.nodemailer.auth
});

module.exports = {
  sendAlertEmail: function (receiver) {
    token = jwToken.sign(receiver);
    confirm_url = sails.config.project.urlWebClient + "confirm?token=" + token;
    console.log("DEBUG: confirmUrl", confirm_url);
    var mailOptions = {
      from: sails.config.project.nodemailer.sender, // sender address
      to: receiver, // send to self
      subject: 'Please confirm your email!', // Subject line
      html: '<p>Welcome! Thanks for signing up. Please follow this link to activate your account:</p>' +
        '<p><a href="' + confirm_url + '"> ' + confirm_url + '</a></p>' +
        '<br>' +
        '<p>Admin!</p>' // html body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return console.log(err);
      else return console.log('Message sent: ' + info.response);
    });
  },

  forgotPasswordMail: function (receiver, name, token) {
    name = name == null ? '' : name;
    url = sails.config.project.urlWebClient + "reset_password?token=" + token + "?emailAddress=" + receiver;
    console.log(receiver);
    console.log(name);
    console.log(token);
    var mailOptions = {
      from: sails.config.project.nodemailer.sender, // sender address
      to: receiver, // send to self
      subject: 'Forget Password Email!', // Subject line
      html: ' <div> <p>Hi ' + name + ',</p>' +
        '<p>You requested for a password reset, kindly use this <a href="' + url + '">link</a> to reset your password</p>' +
        '<br>' +
        '<p>Cheers!</p>  </div>'

    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return console.log(err);
      else return console.log('Message sent: ' + info.response);
    });
  },


  test: function () {

    return 'test ok service';
  }
};