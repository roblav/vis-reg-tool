
const path = require('path')

const config = require('../config')

module.exports = function createImgConfig (data, img) {
  // console.log(__dirname)
  var status
  if (data.misMatchPercentage <= config.misMatchThreshold) {
    status = 'pass'
  } else {
    status = 'fail'
  }
  // Replace any ? with %3F
  var formatImg = img.replace(/[?]/g, '%3F')
  var imgObj = {
    'pair': {
      'reference': path.join('../', config.refImagePath, formatImg),
      'test': path.join('../', config.testImagePath, formatImg),
      'selector': '',
      'fileName': img,
      'label': img,
      'misMatchThreshold': config.misMatchThreshold,
      'diff': data,
      'diffImage': '../' + config.diffImagePath + formatImg + '.jpg'
    },
    'status': status

  }
  return imgObj
}