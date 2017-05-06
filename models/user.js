/**
 * Created by Administrator on 2017/5/3.
 */

var User = require('../lib/mongo').User;


// 用户表的一些操作

module.exports = {

    // 注册一个用户
    createUser: function createUser(user) {
        //mongoose
        // User.create(user, function (err) {
        //     if (err && err.message.match('E11000 duplicate key')) {
        //         //登录名被占用
        //         console.log('登录名被占用');
        //         msg = "登录名被占用";
        //         return msg;
        //     } else if (err) {
        //         console.log('插入数据库失败');
        //         msg = "插入数据库失败";
        //         return msg;
        //     }
        //
        // });

        //mongolass
        return User.create(user).exec();
    },

    //通过 用户名返回用户
    getUserByUserName:function getUserByName(username) {
        return User
            .findOne({username:username})
            .exec();
    }
};