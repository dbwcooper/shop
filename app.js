var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//记录日志
var winston = require('winston');
var expressWinston = require('express-winston');

//后台管理系统的中间件
var flash = require('connect-flash');

var route = require('./routes');

const path = require('path');
const pkg = require('./package.json');
const config = require('./config/default');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

//设置模板全局变量
app.locals = {
  title : "shop",
};

// 添加一个中间件 后端(商户的)前台界面使用
app.use(flash());
// express 框架将post 数据 更新到 req.body 里面

// 使用表单提交的application/x-www-form-urlencoded类型
// app.use(bodyParser.urlencoded({extend:false}));

app.use(bodyParser.json());

//设置 响应数据格式为json
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    // res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});

    next();
});
// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

route(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));
app.listen(config.port,function () {
  console.log(`${pkg.name} listen on port ${config.port}`);
});
module.exports = app;
