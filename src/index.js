
const resemble = require('node-resemble-js')
const fs = require('fs-extra')
const array = require('lodash/array')
const empty = require('is-empty')

const listImages = require('./list-images')

const imagePath = './images'
const refImagePath = '/reference/'
const testImagePath = '/test/'

Promise.all([
  listImages(imagePath + refImagePath),
  listImages(imagePath + testImagePath)
])
  .then(
    (data) => {
      var match = array.difference(data[0], data[1])
      if (empty(match)) {
        console.log('It\'s a match')
        vrtCreateDiff(data[0])
      } else {
        console.log('Your reference and test images do not match. Mis-matched files: ' + match)
      }
    }
  )
  .catch((err) => console.log(err))

function compareImg (img) {
  var refImg = imagePath + refImagePath + img
  var testImg = imagePath + testImagePath + img
  resemble(refImg).compareTo(testImg).ignoreNothing().onComplete(function(data) {
    const diffImagePath = './images/diff/' + img +'.jpg'
    var diffImage = data.getDiffImageAsJPEG(85)
    // Write the diff file to disk.
    fs.writeFile(diffImagePath, diffImage, function(err) {
      if (err) throw err
      console.log('Your diff has been saved to %s', diffImagePath)
      // Generate the compare img config details
      createImgConfig (data, img)
    })
  })
}

function vrtCreateDiff (imgList) {
  //var jsonObj = []
  imgList.forEach( compareImg )
  
}

function createImgConfig (data, img) {
  //console.log(data, img)
  // What does the config file need to look like?
  var imgObj = {
    'pair': {
      'reference': './images/reference/' + img,
      'test': './images/test/' + img,
      'selector': '',
      'fileName': img,
      'label': img,
      'misMatchThreshold': 0.1,
      'diff': data,
      'diffImage': './images/diff/' + img
    },
    'status': 'fail'

  }
  return imgObj
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