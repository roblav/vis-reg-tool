
// Spin up server and open report in web browser

const opn = require('opn');

const config = require('./config')
const path = require('path')

var reportPath = path.join(config.buildDir, config.reportName, config.compareDir, 'index.html')

opn(reportPath)
