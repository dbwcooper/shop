/**
 * Created by Administrator on 2017/5/3.
 */

var config = require('../config/default');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Mongolass = require('mongolass');

var mongolass = new Mongolass();

var Schema = mongoose.Schema;

// var moment = require('moment');
// var objectIdToTimestamp = require('objectid-to-timestamp');
// mongoose.connect(config.mongodb);
// db.on('error',function () {
//     console.log("connect failed!");
// });
//
// db.once('open',function () {
//     console.log('connect success !');
// });
mongolass.connect(config.mongodb);


// var userModel = db.model('users',userSchema);

// var moment = require('moment');
// var objectIdToTimestamp = require('objectid-to-timestamp');
/**
 *  将_id 转变为创建时间
 mongolass.plugin('addCreatedAt',{
    afterFind:function (results) {
        results.forEach(function (item) {
            item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne:function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});
 */

/** 用户model 模型
 * require 将当前字段设置为必须拥有值 即是不能为空。
 */
exports.User = mongolass.model('users', {
    // 登录名非空
    username: {
        type: 'string',
        unique: true,
        require: true
    },
    nickname: {
        type: 'string',
        default: "空手购物"
    },
    password: {
        type: 'string',
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
// 根据用户名找到用户，用户名全局唯一  index 相当于执行 ensureIndex 将name 作为一个索引
exports.User.index({username: 1}, {unique: true}).exec();

/** 商家model 模型
 *  name 商家登录名(具有唯一性)
 *  nickname 商家昵称
 *  date 创建时间
 */
exports.Shipper = mongoose.model('businessmen', new Schema({
    name: String,
    nickname: {type: String, default: "商家"},
    password: String,
    date: {type: Date, default: Date.now},
}));


// 地址model 模型
exports.Address = mongoose.model('address', new Schema({
    user: {type: mongoose.Schema.Types.ObjectId},
    username: {type: String, default: '空手购物'},
    address: {type: String, default: "成都市 双流区 学府路一段24号"},
    phone: {type: Number},
}));

/**
 * 商品model 模型
 *
 */
exports.Good = mongoose.model('goods', new Schema({}));


/** 订单model 模型
 *  goods 存放该订单 所有商品id
 *  address 存放 选择的地址的id
 *  goodsAmount 商品总价
 *  orderAmount 订单总价
 *  freight 运费
 *
 */

exports.Order = mongoose.model('orders', new Schema({
    status: {type: String, default: '正在出货'},
    goodsNumber: Number,
    goodsAmount: Number,
    orderAmount: Number,
    freight: Number,
    orderDate: {type: Date, default: Date.now},
    payDate: Date,
    payType: {type: String, default: '货到付款'},
    remark: String,
    address: mongoose.Schema.Types.ObjectId,
    goods: mongoose.SchemaTypes.Array,
}));


