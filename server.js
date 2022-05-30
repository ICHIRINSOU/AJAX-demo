var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
let n = 1;

if (!port) {
    console.log('请指定端口号')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    console.log('请求路径（带查询参数）为：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        const page1 = fs.readFileSync('db/page1.json').toString()
        const array = JSON.parse(page1)
        const result = array.map(item => `<li>${item.id}</li>`).join('')
        string = string.replace('[{page}]', `<ul id="list">${result}</ul>`)
        response.write(string)
        // response.write(fs.readFileSync('public/index.html'))
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/js.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/script;charset=utf-8')
        response.write(fs.readFileSync('public/js.js'))
        response.end()
    } else if (path === '/html.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/html.html'))
        response.end()
    } else if (path === '/xml.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/xml.xml'))
        response.end()
    } else if (path === '/json.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('public/json.json'))
        response.end()
    } else if (path === '/nextpage') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json; charset=utf-8')
        try {
            response.write(fs.readFileSync(`db/page${n + 1}.json`))
            n += 1
        } catch (error) {
        }
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在`)
        response.end()
    }

})

// console.log(n)
server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
