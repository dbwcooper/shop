/**
 * Created by Administrator on 2017/5/2.
 */
//中间件 检查用户登录 ， 注册时生成 session_id

const sha1 = require('sha1');


module.exports = {

    checkLogin:function checkLogin(req,res,next) {

    },
    checkNotLogin:function checkNotLogin(req,res,next) {

      if(!req.session){
          next();
      }else{
          res.render('index');
      }

    },
    //组合用户用户名+随机数  生成session_id
    register:function register(name) {
        let chars = ['0','1','2','8','9','A','B','G','6','7','H','I','J','K','L','M','N','O','P','4','Q','R','S','T','U','3','5','V','W','X','C','D','E','F','Y','Z'];
       // console.log(Math.ceil(Math.random()*35)); //生成 1-35 的随机数 ceil 向上取整数
        let i=0;
        let tmp = '';
        while(i > 31){
            i++;
            tmp += chars[Math.ceil(Math.random()*35)];
        };
        return sha1(tmp + name);
    }

};