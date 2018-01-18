
const resemble = require('node-resemble-js')
const fs = require('fs-extra')

var file = "./images/reference/Change received - Tax Credits Service.png"
var file2 = "./images/test/Change received - Tax Credits Service.png"

// var diff = resemble(file).compareTo(file2).ignoreColors().onComplete(function(data){
//   console.log(data)
//   /*
//   {
//     misMatchPercentage : 100, // %
//     isSameDimensions: true, // or false
//     dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
//     getImageDataUrl: function(){}
//   }
//   */
// });

var diff2 = resemble(file).compareTo(file2).ignoreNothing().onComplete(function(data) {
  const diffImagePath = './images/diff/' + 'diff.jpg'
  // var diffImage = data.getImageDataUrl().replace(/^data:image\/png;base64,/,"");
  var diffImage = data.getDiffImageAsJPEG(85)
  // Write the diff file to disk.
  fs.writeFile(diffImagePath, diffImage, function(err) {
    if (err) throw err;

    console.log('Your diff has been saved to %s', diffImagePath);
  });
});