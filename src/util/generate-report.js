
const config = require('../config')

const fs = require('fs-extra')
const path = require('path')
const opn = require('opn')

const prepareReport = require('./prepare-report')

module.exports = function generateReport(imgDetailsJson) {
  // Output the file json config file
  //console.log(imgDetailsJson)

  // Create report in new directory
  var comparePath = prepareReport(config.reportName)

  var configJson = {'testSuite': 'Visual Regression Toolkit', 'tests': imgDetailsJson }
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