/**
 * Created by Administrator on 2017/5/4.
 */

//var userModel = require('./testmongo');

var userModel = require('./mongo').User;
var user = {
    name:'real',
    password:'1234567890',
};

userModel.create(user,function (err) {
    if(err){
        console.log(err);
    }else{
        console.log(" 哈哈哈 成功了");
    }
});
