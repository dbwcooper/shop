/**
 * Created by Administrator on 2017/5/3.
 */

var User = require('../lib/mongo').User;


// 用户表的一些操作

module.exports = {

    // 注册一个用户
    createUser: function createUser(user) {
        return User.create(user,function (err) {
            if(err && err.toString().match('E11000 duplicate key')){
                console.log('用户名已存在');

                return 400;
            }else{
                console.log("insert user success");
            }
        });
    },

    //通过 用户名返回用户
    getUserByUserName:function getUserByName(username) {
        return User
            .findOne({username:username});
    }
};