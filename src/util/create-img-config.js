
module.exports = function createImgConfig (data, img) {
  //console.log(data, img)
  // What does the config file need to look like?
  // Replace any ? with %3F
  var formatImg = img.replace(/[?]/g, '%3F')
  var imgObj = {
    'pair': {
      'reference': '../images/reference/' + formatImg,
      'test': '../images/test/' + formatImg,
      'selector': '',
      'fileName': img,
      'label': img,
      'misMatchThreshold': 0.1,
      'diff': data,
      'diffImage': '../images/diff/' + formatImg + '.jpg'
    },
    'status': 'fail'

  }
  return imgObj
}