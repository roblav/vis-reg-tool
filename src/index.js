
const fs = require('fs-extra')
const array = require('lodash/array')
const empty = require('is-empty')

const listImages = require('./util/list-images')
const vrtCreateDiff = require('./util/create-diff')

const imagePath = './images'
const refImagePath = '/reference/'
const testImagePath = '/test/'

Promise.all([
  listImages(imagePath + refImagePath),
  listImages(imagePath + testImagePath)
])
  .then( (data) => {
    var match = array.difference(data[0], data[1])
    if (empty(match)) {
      console.log('It\'s a match. Please wait while the image diff\'s are generated.')

      vrtCreateDiff(data[0])
        .then(function (resolved) {
          // This provides the results array
          // Send to vtrCreateConfig
          vtrCreateConfig(resolved)
        })
        .catch(function (error) {
          console.log(error.message)
        })

    } else {
      console.log('Your reference and test images do not match. Mis-matched files: ' + match)
    }
  })
  .catch((err) => console.log(err))

function vtrCreateConfig(imgDetailsJson) {
  // Output the file json config file
  //console.log(imgDetailsJson)
  var configJson = {'testSuite': 'Visual Regression Test', 'tests': imgDetailsJson }
  var configReport = 'report(' + JSON.stringify(configJson, null, 2) + ')'

  fs.writeFile('./compare/config.js', configReport, function(err) {
    if(err) {
      return console.log(err)
    }
    console.log('Your images have been processed and your report created!')
  })
}
    
// { isSameDimensions: true,
//   dimensionDifference: { width: 0, height: 0 },
//   misMatchPercentage: '2.32',
//   analysisTime: 333,
//   getDiffImage: [Function],
//   getDiffImageAsJPEG: [Function] }


// report({
//   'testSuite': 'BackstopJS',
//   'tests': [
//     {
//       'pair': {
//         'reference': '../bitmaps_reference/P800_Overpaid_Issued_Available_0_content_0_desktop.png',
//         'test': '../bitmaps_test/20161020-102741/P800_Overpaid_Issued_Available_0_content_0_desktop.png',
//         'selector': '#content',
//         'fileName': 'P800_Overpaid_Issued_Available_0_content_0_desktop.png',
//         'label': 'Overpaid Issued: Available',
//         'misMatchThreshold': 0.1,
//         'diff': {
//           'isSameDimensions': false,
//           'dimensionDifference': {
//             'width': 0,
//             'height': -50
//           },
//           'misMatchPercentage': '15.12',
//           'analysisTime': 221
//         },
//         'diffImage': '../bitmaps_test/20161020-102741/failed_diff_P800_Overpaid_Issued_Available_0_content_0_desktop.png'
//       },
//       'status': 'fail'
//     },