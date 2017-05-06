/**
 * Created by Administrator on 2017/5/2.
 */

var express = require('express');
var router = express.Router();

/**
 * 用户注册
 */
router.use('/user',require('./api/user'));



//用户登录 接口
 router.get('/login', function (req, res) {

     res.end("the request is not correct");
 });

router.post('/login', function (req, res) {
    console.log("用户登录接口请求方式: " + req.method);

    console.log("res.session:" + res.session);
    res.end('success post');

});

module.exports = router;