
const path = require('path')

const imgPath = 'images'

var config = {
  imageDir: path.join(imgPath),
  compareDir: path.join('compare'),
  refImagePath: path.join(imgPath, 'reference/'),
  testImagePath: path.join(imgPath, 'test/'),
  diffImagePath: path.join(imgPath, 'diff/'),
  reportName: 'first-journey',
  misMatchThreshold: 1
}

module.exports = config