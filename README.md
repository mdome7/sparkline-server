# Sparkline Server
----------------------
An HTTP server that can generate sparklines that can be used in other websites or apps.
Give it some values and parameters, it will give you back a sparkline in the following supported formats:
- image/svg+xml - SVG text
- text/html - SVG text above wrapped in html tags
- (image/png, image/jpeg, image/gif) - *not yet supported*


## Start the server locally

Download the code, build and then run using node.

```
cd sparkline-server

npm i

node server/app.js [listen-port(default 9000)]
```

## Running in Docker

Build the image and run:

```
docker build -t sparkline-server
docker run -d -p 9000:9000 sparkline-server:latest
```
See [https://hub.docker.com/_/node/](https://hub.docker.com/_/node/)


## Request some sparklines
REST endpoint parameters
- w - width
- h - height
- values - comma-separated numerical values
- format - data format to return [html|svg(default)]

### Some Examples

```

curl 'http://localhost:9000/?h=100&w=200&values=5,6,4,7,3,8,2,9,1,10&format=html'
  <svg width="200" height="100">
    <polyline style="fill: none; stroke: blue; stroke-width: 1" points="0,49 22,37 44,61 66,24 88,74 110,12 132,86 154,0 176,99 199,-13" />
  </svg>

curl 'http://localhost:9000/?h=100&w=200&values=5,6,4,7,3,8,2,9,1,10&format=html'
  <html>
    <svg width="200" height="100">
      <polyline style="fill: none; stroke: blue; stroke-width: 1" points="0,49 22,37 44,61 66,24 88,74 110,12 132,86 154,0 176,99 199,-13" />
    </svg>
  </html>
```
