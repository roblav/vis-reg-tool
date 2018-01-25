const resemble = require('node-resemble-js')
const fs = require('fs-extra')
const config = require('../config')

const createImgConfig = require('./create-img-config')

module.exports = function vrtCreateDiff (imgList) {
  
  // Make sure there is a diff directory
  fs.ensureDirSync(config.diffImagePath)

  var jsonObj = []

  return new Promise( (resolve, reject) => {

    let imgListLen = imgList.length
    imgList.forEach( function compareImg (img) {

      var refImg = config.refImagePath + img
      var testImg = config.testImagePath + img

      resemble.outputSettings({
        errorColor: {
          red: 255,
          green: 0,
          blue: 255
        },
        errorType: 'movement',
        transparency: 0.3,
        largeImageThreshold: 1200,
        useCrossOrigin: false,
        outputDiff: true
      })
    
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