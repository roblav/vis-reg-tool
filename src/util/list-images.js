// Generate a list of images
var fs = require('fs-extra')

module.exports = function(imagePath) {

  return new Promise(function (fulfill, reject){
    fs.readdir(imagePath, function(err, files){
      if (err) reject(err)
      else fulfill(files)
    })
  })
  
}