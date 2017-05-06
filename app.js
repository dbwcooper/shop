var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var route = require('./routes');

const path = require('path');
const pkg = require('./package.json');
const config = require('./config/default');
// 随机生成 secret 作为 session_id
const secret = require('./middlewares/middle');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

//设置模板全局变量
app.locals = {
  title : "shop",
};

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
    res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});

    next();
});

route(app);

app.listen(config.port,function () {
  console.log(`${pkg.name} listen on port ${config.port}`);
});
module.exports = app;
