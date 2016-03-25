/**
 * Scales the values to the specified height and
 * translates them to 0 minimum.
 */
var scaleY = (values, height) => {
  var h = height - 1 // We want values to range from 0 to (height - 1)
  var min, max  = null

  values.forEach( (y) => {
    if (min == null || y < min) min = y
    if (max == null || y > max) max = y
  })

  var diff = max - min
  return values.map( (y) => {
    return y == min ? 0 : ((y - min) * h / diff) 
  }) 
}

/**
 * Compress or stretch 
 * the number of values to fit the width
 */
var generatePoints = (values, width) => {
  var w = width - 1 // we want x values to range from 0 to (width - 1)

  if (values.length > width) { // compress
     
  } else { // stretch
    var i = 0 
    return values.map( (y) => {
      var x = (i++ * w) / (values.length - 1)
      return [x, y]
    })
  }
}

module.exports = (values, width, height, callback) => {
  if (!values || values.length == 0) return callback('Must supply numerical values', null)
  if (height < 2) return callback ('Height must be 2 or greater')

  var scaledValues = scaleY(values, height) // fit vertically
  var points = generatePoints(scaledValues, width) // fit horizontally and generate x, y points

  var svg = '<svg width="' + width + '" height="' + height + '">'
  svg += '<polyline style="fill: none; stroke: blue; stroke-width: 1" points="'
  svg += points.map( (xy) => [Math.floor(xy[0]), Math.floor((height -1) - xy[1])] ).join(' ')
  svg += '" /> </svg>'
  callback(null, svg)
}
