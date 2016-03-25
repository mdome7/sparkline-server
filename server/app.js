var http = require('http'),
    url = require('url'),
    slSvg = require('./sparklineSvg');

var port = process.argv[2] ? process.argv[2] : 9000

var server = http.createServer( (request, response) => {
    var requestInfo = url.parse(request.url, true)
    
    if (! requestInfo.query['values']) {
    	response.end('')
    } else {
        var values = requestInfo.query['values'].split(',').map(x => parseFloat(x))
        var width = parseInt(requestInfo.query['w'] ? requestInfo.query['w'] : 100)
        var height = parseInt(requestInfo.query['h'] ? requestInfo.query['h'] : 20)
        var format = requestInfo.query['format'] ? requestInfo.query['format'] : 'svg'

        console.log('Params: w=' + width + ', h=' + height + ', format=' + format + ', values=' + values.join())
        slSvg(values, width, height, (err, svg) => {
                console.log(svg)
                if (format === 'html') {
                	response.setHeader('Content-Type', 'text/html')
                	response.end('<html><body style="margin: 0">' + svg + '</body></html>')
              	} else if (format === 'png') {
                	response.setHeader('Content-Type', 'text/plain')
                    response.statusCode = 400
              		response.end('Not yet supported') // future
                } else {
                	response.setHeader('Content-Type', 'image/svg+xml')
                	response.end(svg)
                }
        })
    }
})

console.log(`Listening on port ${port}`)
server.listen(port)
