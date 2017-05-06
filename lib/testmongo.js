/**
 * Created by Administrator on 2017/5/3.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/default');
mongoose.connect(config.mongodb);
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connect error');
});
// db.once('open',function () {
//     console.log('connect success !');
//
// });
db.on('open', function (cb) {
    console.log('connect success !');

});

//Schema 结构

var userSchema = new Schema({
    name: String,
    password: String,
    nickname: {type: String, default: 'shop'},
    date: {type: Date, default: Date.now},
});

//得到用户model 对应的是mongodb里面的数据库shop里面的users表结构
var userModel = mongoose.model('users', userSchema);

//entity
var user = {
    name:'testName1',
    password:'123456789000000',
};

//根据实际数据新建一个实体类 这个类也可以进行对应表的所有操作 增删查改
//一般不这么用
var userEntity = new userModel(user);

// userEntity.save(function (err) {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("save success");
//     }
//     db.close();
// });
// 异步执行 find 先于 save执行完毕

userModel.find(function (err,arr) {
   console.log(arr);
});
// 即使 在相同条件下 依旧返回最开始的一条数据
userModel.findOne({name:'testName'},function (err,user) {
    console.log(user);
});

var conditions = {name:'testName'};
var update     = {$set : {nickname : 'shop_update'}};

userModel.update(conditions,update,{upsert:true,overwrite:true,multi:true},function (err,num,rawnum) {
    if(err){
        console.log(err);
    }else{
        console.log("update ok");
    }
    console.log(rawnum);//受影响的行数
    db.close();
});

//基于model的增删查改
userModel.create(user,function (err) {
    if(err){
        console.log('create fail : '+err);
    }else{
        console.log('create user success');
    }

});

// 删除 操作 删除所有符合条件的文件
userModel.remove({name:"testName"},function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("update ok");
    }
});


module.exports = exports = mongoose.model('users',userSchema);