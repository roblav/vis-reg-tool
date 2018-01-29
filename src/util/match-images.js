const array = require('lodash/array')
const empty = require('is-empty')

module.exports = function matchImage(data) {
  var match = array.difference(data[0], data[1])
  if (empty(match)) {
    console.log('It\'s a match. Please wait while the image diff\'s are generated.')
    return data
  } else {
    console.log('Your reference and test images do not match. Mis-matched files: ' + match)
  }
}