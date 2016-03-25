var http = require('http'),
    url = require('url'),
    svg2png = require("svg2png"),
    slSvg = require('./sparklineSvg');

var port = process.argv[2] ? process.argv[2] : 9000

var server = http.createServer( (request, response) => {
    var requestInfo = url.parse(request.url, true)
    
    if (! requestInfo.query['values']) {
    	response.end('')
    } else {
    	var values = requestInfo.query['values'].split(',')
        var width = requestInfo.query['w'] ? requestInfo.query['w'] : 100
        var height = requestInfo.query['h'] ? requestInfo.query['h'] : 20
        var format = requestInfo.query['format'] ? requestInfo.query['format'] : 'svg'

    	console.log(requestInfo)

        console.log('Params: w=' + width + ', h=' + height + ', format=' + format + ', values=' + values.join())
        slSvg(values, width, height, (err, svg) => {
                console.log(svg)
                if (format === 'html') {
                	response.setHeader('Content-Type', 'text/html')
                	response.end('<html>' + svg + '</html>')
              	} else if (format === 'png') {
					console.log('png')
                	response.setHeader('Content-Type', 'image/png')
              		svg2png(new Buffer(svg, 'utf-8'))
              			.then( buffer => {
	   						console.log("Writing png buffer")
	                        response.end(buffer)
						})
						.catch(e => console.error(e))
                } else {
                	response.setHeader('Content-Type', 'image/svg+xml')
                	response.end(svg)
                }
        })
    }
})

console.log(`Listening on port ${port}`)
server.listen(port)
