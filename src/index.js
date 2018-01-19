
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

function vrtCreateDiff (imgList) {
  imgList.forEach( function (img) {
    var refImg = imagePath + refImagePath + img
    var testImg = imagePath + testImagePath + img
    resemble(refImg).compareTo(testImg).ignoreNothing().onComplete(function(data) {
      const diffImagePath = './images/diff/' + img +'.jpg'
      var diffImage = data.getDiffImageAsJPEG(85)
      // Write the diff file to disk.
      fs.writeFile(diffImagePath, diffImage, function(err) {
        if (err) throw err
        console.log('Your diff has been saved to %s', diffImagePath)
      })
    })
  })
}
    
