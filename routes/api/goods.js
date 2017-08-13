/**
 * Created by Administrator on 2017/5/8.
 */

var express = require('express');
var router = express.Router();
var goodsModel = require('../../models/goods');

var jwtVerify = require('../../middlewares/jwt').jwtVerify;
/**
 * 增加一个商品
 */

router.post('/submit',jwtVerify,function (req,res) {
    let goods = req.body;
    let result ={};

    if(!goods){
        result.code = 400;
        result.msg = '商品信息错误';
        res.end(JSON.stringify(result));
    }

});


module.exports = router;