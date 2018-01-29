
const config = require('./config')

const listImages = require('./util/list-images')
const matchImages = require('./util/match-images')
const createDiff = require('./util/create-diff')
const generateReport = require('./util/generate-report')

Promise.all([
  listImages(config.refImagePath),
  listImages(config.testImagePath)
])
  .then(matchImages)
  .then(createDiff)
  .then(generateReport)
  .catch((err) => console.log(err))
  