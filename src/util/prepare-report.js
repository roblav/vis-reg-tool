// Prepare report files

// Create new directory
const fs = require('fs-extra')
const path = require('path')
const config = require('../config')

module.exports = function prepareReport(reportName) {

  const dir = path.join(config.buildDir, reportName)

  fs.ensureDirSync(dir)
  
  // copy directory, even if it has subdirectories or files
  fs.copySync(config.imageDir, path.join(dir, config.imageDir))

  // Copy /compare
  fs.copySync(config.compareDir, path.join(dir, config.compareDir))

  return path.join(dir, config.compareDir)

}
