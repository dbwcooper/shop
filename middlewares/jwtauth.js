/**
 * Created by Administrator on 2017/5/6.
 */

const jwt = require('jsonwebtoken');

// 要加密的 secret 字符串 用于剩余token

const SECRET = require('../config/default').secret;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3ROYW1lIiwiaWF0IjoxNDk0MDYxNzQyLCJleHAiOjE0OTQzMjA5NDJ9.AkOgnSz6L_1Mj37VBazyNHCASYnQjdnCSSA1h1Ovtpo';


jwt.verify(token,SECRET,function (err,decoded) {

    console.log(decoded);
});