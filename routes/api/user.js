/**
 * Created by Administrator on 2017/5/3.
 */

const express = require('express');
const router = express.Router();
const userModel = require('../../models/user');

const User = require('../../lib/mongo').User;

const sha1 = require('sha1');
const jwt = require('../../middlewares/jwt');



/**
 * 用户注册
 */
router.post('/register', function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

 
    let result = {};
   
    if (username && password){
        let user = {
            username: username,
            password: sha1(password)
        };
        User.create(user, function (err) {
                if (err && err.toString().match('E11000 duplicate key')) {
                    result.code = 402;
                    result.msg = "用户名已存在";
                    res.end(JSON.stringify(result));
                }
            })
            .then(function (model) {
                // 执行成功  resolved
        
                let token = jwt.jwtSign(user.username);
                result.data = token;
                res.end(JSON.stringify(result));

            })
            .then(function (err) {
                // 执行失败 rejected
                result.code = 406;
                result.msg = "创建用户失败";
                res.end(JSON.stringify(result));
            });

    }else{

        result.code = 401;
        result.msg = '参数错误';
        res.end(JSON.stringify(result));
    }
});

/**
 * 用户登录
 *  具体逻辑实现:
 *  服务端接收用户的 用户名和密码 与数据库进行比对，通过验证之后 颁发token(secret + username)
 *  以后该用户的每一次请求接口必须带上该用户的token,(设计两个类 一个颁发token类,一个token验证类)
 */
router.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let result = {};
   
    if (!username || !password){
        result.code = 401;
        result.msg = '参数错误';
        res.end(JSON.stringify(result));
    }
   
    userModel.getUserByUserName(username)
        .then(function (user) {
            if (!user) {
                result.code = 402;
                result.msg = '用户不存在';
                res.end(JSON.stringify(result));
            }
            //检查密码是否一致
            else if (sha1(password) !== user.password) {
                result.code = 403;
                result.msg = '用户名或密码错误';
                res.end(JSON.stringify(result));
            } else {
                
                let token = jwt.jwtSign(user.username);

                result.data = token;
                res.end(JSON.stringify(result));
                delete result.data;
            }
        })
        .catch(function (err) {
            result.code = 500;
            result.msg = '服务端错误' + err;
            res.end(JSON.stringify(result));
        });
});

/**
 * 用户修改密码 和 其他信息 2017/6/14
 */
router.post('/:id', jwt.jwtVerify, function (req, res) {
    let user = req.body;

    let result = {};
    result.code = 200;
    result.msg = 'success';

    //判断 用户是否修改密码

    if (!(user.username.length >= 1 && user.username.length <= 10) || user.password.length < 6) {
        result.code = 400;
        result.msg = "用户名或密码有误";
        res.end(JSON.stringify(result));
    } else {
        User.create(user, function (err) {
                if (err && err.toString().match('E11000 duplicate key')) {
                    result.code = 400;
                    result.msg = "用户名已存在";
                    res.end(JSON.stringify(result))
                }
            })
            .then(function (model) {
                // 执行成功  resolved
                res.end(JSON.stringify(result));
            })
            .then(function (err) {
                // 执行失败 rejected
                console.log(err);
                result.code = 400;
                result.msg = "创建用户失败";
                res.end(JSON.stringify(result));
            });

    }
});


module.exports = router;