// PROJECT SETTINGS

module.exports.project = {
  name: 'TWeb',
  author: 'Tien-Truong-Trung-Ngoc',
  description: 'Machine learning ecommerce website',
  version: '0.2.0',
  year: new Date().getFullYear(),
  website: 'http://google.com',
  currency: {
    position: 'FRONT', // FRONT / END
    exchange_rate: 1000,
    locale: {
      'kr': '원',
      'en': 'Won'
    },
    symbol: '€'
  },
  analytics: {
    id: ''
  },

  fileSystem: '', // s3, gridfs, local,
  disqusShortname: '',
  nodemailer: {
    auth: {
      user: 'turtledev2019@gmail.com',
      pass: '15520891'
    },
    sender: 'TWebML COMMERCE ✔ <google@gmail.com>',
    mailToAlert: 'turtledev2019@gmail.com'
  },
  //Customize
  urlWebClient: "http://localhost:4200/"
}
