/**
 * Created by Administrator on 2017/5/2.
 */

var express = require('express');
var router = express.Router();

/**
 * 用户接口
 */
router.use('/user',require('./api/user'));

/**
 * 商家接口
 */
router.use('/shipper',require('./api/shipper'));

/**
 * 商品接口
 */
router.use('/goods',require('./api/goods'));

/**
 * 二维码分类商品接口
 */

router.use('/barcode',require('./api/goods'));

/**
 * 订单接口
 */
router.use('/orders',require('./api/order'));

/**
 * 地址接口
 */

router.use('/address',require('./api/address'));




//路径访问出错
router.use(function (req,res) {
    console.log("123"+res.headersSent);

    if(!res.headersSent){
        res.status(404).end();
    }
});

module.exports = router;