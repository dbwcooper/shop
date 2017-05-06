/**
 * Created by Administrator on 2017/5/6.
 */

var jwt = require('jsonwebtoken');
const SECRET = require('../config/default').secret;


module.exports = {
    jwtSign: function jwtsign(username) {

        //设置 token 的日期 加密方式 RS256
        let token = jwt.sign({username: username}, SECRET, {expiresIn: '3 days'});
        let myjwt = {
            token:token,
        };
        console.log(token);
        return myjwt;
    },


    //解密出来包括三部分   加密的用户名 ，token生成时间 token到期时间
    // { username: 'testName', iat: 1494061742, exp: 1494320942 }
    jwtVerify: function jwtverify(req,res,next) {

        // 从body或query或者header中获取token
        // req.query get方式  req.headers[''] post 方式

        let token = req.body.token || req.query.token || req.headers["x-access-token"];
        console.log('jwtVerify token :'+ token);
        try {
            let decode = jwt.verify(token, SECRET);
            console.log(decode);
            return decode.username;
        } catch (e) {

        }
    }
};