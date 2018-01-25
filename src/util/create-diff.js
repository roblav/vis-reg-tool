const resemble = require('node-resemble-js')
const fs = require('fs-extra')
const config = require('../config')

const createImgConfig = require('./create-img-config')

module.exports = function vrtCreateDiff (imgList) {
  
  var jsonObj = []

  return new Promise( (resolve, reject) => {

    let imgListLen = imgList.length
    imgList.forEach( function compareImg (img) {

      var refImg = config.refImagePath + img
      var testImg = config.testImagePath + img
    
      resemble(refImg).compareTo(testImg).ignoreNothing().onComplete(function(data) {
        const diffImgPath = config.diffImagePath + img +'.jpg'
        var diffImage = data.getDiffImageAsJPEG(85)
        // Write the diff file to disk.
        fs.writeFile(diffImgPath, diffImage, function(err) {
          if (err) reject(err)
          // Generate the compare img config details
          jsonObj.push(createImgConfig (data, img))
          if(--imgListLen <= 0) {
            resolve(jsonObj)
          }
        })
      })

    })
  })
}