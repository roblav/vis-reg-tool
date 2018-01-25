
const fs = require('fs-extra')
const array = require('lodash/array')
const empty = require('is-empty')
const path = require('path')
const opn = require('opn');

const config = require('./config')

const listImages = require('./util/list-images')
const vrtCreateDiff = require('./util/create-diff')
const prepareReport = require('./util/prepare-report')

Promise.all([
  listImages(config.refImagePath),
  listImages(config.testImagePath)
])
  .then( (data) => {
    var match = array.difference(data[0], data[1])
    if (empty(match)) {
      console.log('It\'s a match. Please wait while the image diff\'s are generated.')

      vrtCreateDiff(data[0])
        .then(function (resolved) {
          // This provides the results array
          // Send to vtrCreateConfig
          vtrGenerateReport(resolved)
        })
        .catch(function (error) {
          console.log(error.message)
        })

    } else {
      console.log('Your reference and test images do not match. Mis-matched files: ' + match)
    }
  })
  .catch((err) => console.log(err))

function vtrGenerateReport(imgDetailsJson) {
  // Output the file json config file
  //console.log(imgDetailsJson)

  // Create report in new directory
  var comparePath = prepareReport(config.reportName)

  var configJson = {'testSuite': 'Visual Regression Test', 'tests': imgDetailsJson }
  var configReport = 'report(' + JSON.stringify(configJson, null, 2) + ')'

  var configPath = path.join(comparePath, 'config.js')

  fs.writeFile(configPath, configReport, function(err) {
    if(err) {
      return console.log(err)
    }
    console.log('Your images have been processed and your report created!')

    // Open report in default browser
    var reportPath = path.join(config.buildDir, config.reportName, config.compareDir, 'index.html')
    opn(reportPath)
  })
}
