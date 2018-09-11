// Generate a list of images
var fs = require('fs-extra')

module.exports = function(imagePath) {

  return new Promise(function (fulfill, reject){
    fs.readdir(imagePath, function(err, files){
      // Make sure files only contains image files jpeg, jpg, png
      var regex = /\w+\.(png|jpg|jpeg)$/
      const result = files.filter(file => file.match(regex))
      if (err) reject(err)
      else fulfill(result)
    })
  })
  
}