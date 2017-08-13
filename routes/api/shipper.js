/**
 * Created by Administrator on 2017/5/8.
 */

var ShipperModel = require('../../models/shipper');

var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var jwt = require('../../middlewares/jwt');

var Shipper = require('../../lib/mongo').Shipper;
/**
 * 商家注册
 */
router.post('/register', function (req, res) {

    let shippername = req.body.shippername;
    let password = req.body.password;

    let result = {};
    result.code = 200;
    result.msg = 'success';

    if (!(shippername.length >= 1 && shippername.length <= 10)) {
        result.code = 400;
        result.msg = "商家名输入有误";
    } else if (password.length < 6) {
        result.code = 400;
        result.msg = "密码输入有误";
    } else {
        let shipper = {
            shippername: shippername,
            password: sha1(password),
        };
        Shipper.create(shipper, function (err) {
            if (err && err.toString().match('E11000 duplicate key')) {
                result.msg = "商家已存在";
                result.code = 401;
                res.end(JSON.stringify(result));
            }
        })
            .then(function (shipper_model) {

                console.log("register success");
                res.end(JSON.stringify(result));
            })
            .then(function (err) {
                result.code = 400;
                result.msg = "新增失败";
                res.end(JSON.stringify(result));
            });
    }
});

/**
 * 商家登录
 */

router.post('/login', function (req, res) {

    let shippername = req.body.shippername;
    let password = req.body.password;

    let result = {};
    result.code = 200;
    result.msg = 'success';

    ShipperModel.getShipperByShipperName(shippername)
        .then(function (shipper) {
            if (!shipper) {
                result.code = 400;
                result.msg = "商家不存在";
                res.end(JSON.stringify(result));
            } else if (sha1(password) !== shipper.password) {
                result.code = 400;
                result.msg = "密码错误";
                res.end(JSON.stringify(result));
            } else {
                //   商家校验成功  开始构造 商家token
                let token = jwt.jwtSign(shipper.shippername);
                result.data = token;
                res.end(JSON.stringify(result));
            }

        })
        .catch(function (err) {
            result.code = 400;
            result.msg = "登录失败 " + err;
            res.end(JSON.stringify(result));
        })


});

/**
 * 新增商品
 */

module.exports = router;






