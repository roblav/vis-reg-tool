// Generate a list of images
var fs = require('fs-extra')

module.exports = function(imagePath) {

  // Create a list of images

  // fs.readdir(imagePath, function(err, files) {
  //     //var images = []
  //     if (err) return;
  //     // files.forEach(function(f) {
  //     //     console.log(images)
  //     //     images.push(f)
  //     //     //console.log('Files: ' + f);
  //     // });
  //     // console.log(files)
  //     return files
  // });

  return new Promise(function (fulfill, reject){
    fs.readdir(imagePath, function(err, files){
      if (err) reject(err)
      else fulfill(files)
    })
  })
  

}