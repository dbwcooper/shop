/**
 * Created by Administrator on 2017/4/27.
 */

var http = require('http');
var url = require('url');
var helloworld = "";
for (var i = 0; i < 1024 * 10; i++) {
    helloworld += "abcd";
}

http.createServer(function (req, res) {

    console.log(req.headers);
    if(req.url!=="/favicon.ico")
    {
        console.log(req.url);
        console.log(url.parse(req.url,true).query);
    }

    res.writeHead(200);

    res.end(helloworld);
}).listen(8001);