/**
 * Created by Administrator on 2017/5/3.
 */

var express = require('express');
var route = express.Router();
var userModel = require('../../models/user');
var sha1 = require('sha1');
var jwt = require('../../middlewares/jwt');


/**
 * 用户注册
 */
route.post('/register', function (req, res) {


    let username = req.body.username;
    let password = req.body.password;

    let result = {};
    result.code = 200;
    result.msg = 'success';

    if (!(username.length >= 1 && username.length <= 10)) {
        result.code = 400;
        result.msg = "用户名输入有误";
    } else if (password.length < 6) {
        result.code = 400;
        result.msg = "密码输入有误";
    } else {

        // repassword 申明会提前 所以 password 与 repassword 名字不能一样
        let repassword = sha1(password);
        let user = {
            username: username,
            password: repassword,
        };

        userModel.createUser(user)
            .then(function (user_model) {
                console.log(user_model.ops[0]);
                console.log("成功");

                res.end(JSON.stringify(result));
            })
            .catch(function (err) {
                if (err.message.match('E11000 duplicate key')) {
                    result.msg = "用户已存在";
                    result.code = 401;
                    res.end(JSON.stringify(result));
                }
            });

    }
});

/**
 * 用户登录
 *  具体逻辑实现:
 *  服务端接收用户的 用户名和密码 与数据库进行比对，通过验证之后 颁发token(secret + username)
 *  以后该用户的每一次请求接口必须带上该用户的token,(设计两个类 一个颁发token类,一个token验证类)
 */
route.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let result = {};
    result.code = 200;
    result.msg = 'success';

    userModel.getUserByUserName(username)
        .then(function (user) {
            if (!user) {
                result.code = 400;
                result.msg = '用户:' + username + '不存在';
                res.end(JSON.stringify(result));
            }
            //检查密码是否一致
            else if (sha1(password) !== user.password) {
                result.code = 400;
                result.msg = '用户名或密码错误';
                res.end(JSON.stringify(result));
            }
            else {
                //制作 token  每一次token 都会变化
                let token = jwt.jwtSign(user.username);

                result.data = token;
                res.end(JSON.stringify(result));
                delete result.data;
            }
        })
        .catch(function (err) {
            result.code = 400;
            result.msg = '登录失败' + err;
            res.end(JSON.stringify(result));
        });
});

module.exports = route;