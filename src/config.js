
const path = require('path')

const imgPath = 'images'

var config = {
  refImagePath: path.join(imgPath, 'reference/'),
  testImagePath: path.join(imgPath, 'test/'),
  diffImagePath: path.join(imgPath, 'diff/'),
  misMatchThreshold: 1
}

module.exports = config