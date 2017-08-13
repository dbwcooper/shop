/**
 * Created by Administrator on 2017/5/3.
 */

var config = require('../config/default');
var mongoose = require('mongoose');

// 如果连接报错
mongoose.Promise = global.Promise;

var db = mongoose.connection;
var Schema = mongoose.Schema;

 mongoose.connect(config.mongodb);
 db.on('error',function () {
     console.log("connect failed!");
 });

db.once('open', function () {
    console.log('connect success !');
});




/** 用户model 模型
 * require 将当前字段设置为必须拥有值 即是不能为空。
 * unique: true,  设置当前字段 username 在users 集合里面具有唯一性
 */

exports.User = mongoose.model('users', new Schema({
    // 登录名非空
    username: {
        type: String,
        unique: true,
        require: true
    },
    nickname: {
        type: String,
        default: "空手购物"
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{date:1}));

// 根据用户名找到用户，用户名全局唯一  index 相当于执行 ensureIndex 将name 作为一个索引
// exports.User.index({username: 1}, {unique: true}).exec();


/** 商家model 模型
 *  name 商家登录名(具有唯一性)
 *  nickname 商家昵称
 *  date 创建时间
 */
exports.Shipper = mongoose.model('shippers',new Schema({
    // 登录名非空
    loginName: {
        type: String,
        unique: true,
        require: true
    },
    nickname: {
        type: String,
        default: "空手购物"
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
}));


// 地址model 模型
exports.Address = mongoose.model('addresses', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'users',
        require: true
    },
    addressee: {
        type: String,
        require: true
    },
    address: {
        type: String, default: "(默认地址)  成都市 双流区 学府路一段24号",
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
}));

/**
 * 商品model 模型
 * status : 商品状态 默认是上架中
 * description : 商品描述
 * scanCode : 商品二维码
 * stock : 商品库存 number 默认是 0
 */

exports.Goods = mongoose.model('goods', new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true,
    },

    status:{
        type:String,
        default:"STATUS_SHELF",
    },
    description:{
        type:String,
    },
    scanCode:{
        type:String,
    },
    image:{
        type:String,
    },
    stock:{
        type:Number,
        default:0,
    },
    date:{
        type:Date,
        default:Date.now,
    }
}));


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


