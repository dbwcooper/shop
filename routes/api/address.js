/**
 * Created by Administrator on 2017/5/8.
 */

var express = require('express');
var router = express.Router();

var jwt = require('../../middlewares/jwt').jwtVerify;
var addressModel = require('../../models/address');

var userModel = require('../../models/user');


// 6-6 现在有一个get方式的路由问题


/**
 * 根据 地址Id，用户id(token) 获取单个地址信息
 *
 */
router.get('/:addressId', jwt, function (req, res) {

    //得到用户名
    let username = req.body.jwtName;


    let addressId = req.params.addressId; // addressId 是上面匹配到的
    console.log(addressId);

    let result = {};
    result.code = 200;
    result.msg = "success";

    //先用用户名得到用户ID
    userModel.getUserByUserName(username)
        .then(function (user) {
            if (!user) {
                result.code = 400;
                result.msg = '用户:' + username + '不存在';
                res.end(JSON.stringify(result));
            }
            //得到用户 user
            //根据用户id 和 addressId 拿到该地址
            addressModel.getOneAddress(user._id, addressId)
                .then(function (address) {
                    if (!address) {
                        //该用户没有地址
                        result.code = 400;
                        result.msg = '用户:' + username + '未创建地址';
                        res.end(JSON.stringify(result));
                    }

                    //未判断 如果A用户给的地址权限并不属于A

                    console.log(address);
                    result.code = 200;
                    result.msg = "success";
                    //返回的直接就是 对象(单个) 数组(多个)
                    result.data = address;

                    res.end(JSON.stringify(result));
                })
                .catch(function (err) {
                    result.code = 400;
                    result.msg = '查找失败' + err;
                    res.end(JSON.stringify(result));
                });

        })
        .catch(function (err) {
            result.code = 400;
            result.msg = '登录失败' + err;
            res.end(JSON.stringify(result));
        });

});

/**
 * 根据 地址Id，用户token 更改用户的地址信息  post 请求
 */

router.post('/:addressId', jwt, function (req, res) {
    let Address = req.body;
    let result = {};
    result.code = 200;
    result.msg = "success";

    try {

        if (Address.addressee === '' || Address.address === '' || Address.phone === '') {
            result.code = 400;
            result.msg = "参数错误！";
            res.end(JSON.stringify(result));
        }

        // 先拿到用户id
        userModel.getUserByUserName(Address.jwtName.trim())
            .then(function (user) {
                if (!user) {
                    result.code = 400;
                    result.msg = '用户:' + username + '不存在';
                    res.end(JSON.stringify(result));
                }

                //address 对象
                let address = {
                    user: user._id,
                    addressee: Address.addressee,
                    phone: Address.phone,
                    address: Address.address,
                };

                //开始进行数据库操作

                addressModel.updateOneAddress(address)
                    .then(model => res.end(JSON.stringify(result)))
                    .then(function (err) {
                        //    当前是Reject 拒绝 状态

                        result.code = 400;
                        result.msg = "新增地址异常";
                        res.end(JSON.stringify(result));
                    });
            })
            .catch(function (err) {
                result.code = 400;
                result.msg = "用户身份错误" + err;
                res.end(JSON.stringify(result));
            });

    } catch (e) {
        result.code = 400;
        result.msg = "新增地址异常";
        console.log("address " + e.toString());
        res.end(JSON.stringify(result));
    }

});


/**
 * 根据 地址id 和 token 删除该地址
 */
router.delete('/:addressId', jwt, function (req, res) {
    let Address = req.body;
    let result = {};
    result.code = 200;
    result.msg = "success";

    let addressId = req.params.addressId;
    console.log(addressId);
    try {
        // 先拿到用户id
        userModel.getUserByUserName(Address.jwtName.trim())
            .then(function (user) {
                if (!user) {
                    result.code = 400;
                    result.msg = '用户:' + username + '不存在';
                    res.end(JSON.stringify(result));
                }

                //开始进行数据库操作

                addressModel.deleteOneAddress(user._id,addressId)
                    .then(function (model) {

                        console.log(model.result.n);
                        if(model.result.n === 0){
                            result.code = 400;
                            result.msg = "已删除用户";
                            res.end(JSON.stringify(result));
                        }else{
                            res.end(JSON.stringify(result));
                        }

                    })
                    .then(function (err) {
                        //    当前是Reject 拒绝 状态

                        result.code = 400;
                        result.msg = "删除地址异常";
                        res.end(JSON.stringify(result));
                    });
            })
            .catch(function (err) {
                result.code = 400;
                result.msg = "用户身份错误" + err;
                res.end(JSON.stringify(result));
            });

    } catch (e) {
        result.code = 400;
        result.msg = "删除地址异常";
        console.log("address " + e.toString());
        res.end(JSON.stringify(result));
    }


});


/**
 * 获取用户 所有 地址
 * 使用jwt判断 token是否有效，如果有效就能拿到该用户的地址信息
 */
router.get('/', jwt, function (req, res) {

    console.log("get /");
    //得到用户名
    let username = req.body.jwtName;

    let result = {};
    result.code = 200;
    result.msg = "success";

    try {
        //先用用户名得到用户ID
        userModel.getUserByUserName(username)
            .then(function (user) {
                if (!user) {
                    result.code = 400;
                    result.msg = '用户:' + username + '不存在';
                    res.end(JSON.stringify(result));
                }
                //得到用户 user


                addressModel.getOwnAddress(user._id)
                    .then(function (address) {
                        if (!address) {
                            //该用户没有地址
                            result.code = 400;
                            result.msg = '用户:' + username + '未创建地址';
                            res.end(JSON.stringify(result));
                        }
                        result.code = 200;
                        result.msg = "success";
                        //返回的直接就是 对象(单个) 数组(多个)
                        result.data = address;

                        res.end(JSON.stringify(result));
                    })
                    .catch(function (err) {
                        result.code = 400;
                        result.msg = '查找失败' + err;
                        res.end(JSON.stringify(result));
                    });

            })
            .catch(function (err) {
                result.code = 400;
                result.msg = '登录失败' + err;
                res.end(JSON.stringify(result));
            });
    }
    catch (e) {
        result.code = 400;
        result.msg = "获取地址信息失败" + err;
        res.end(JSON.stringify(result));
    }
});


/**
 * 新增地址
 */
router.post('/submit', jwt, function (req, res) {
    let Address = req.body;

    let result = {};
    result.code = 200;
    result.msg = "success";

    try {
        if (Address.addressee === '' || Address.address === '' || Address.phone === '') {
            result.code = 400;
            result.msg = "参数错误！";
            res.end(JSON.stringify(result));
        }

        // 先拿到用户id
        userModel.getUserByUserName(Address.jwtName.trim())
            .then(function (user) {
                if (!user) {
                    result.code = 400;
                    result.msg = '用户:' + username + '不存在';
                    res.end(JSON.stringify(result));
                }

                //address 对象
                let address = {
                    user: user._id,
                    addressee: Address.addressee,
                    phone: Address.phone,
                    address: Address.address,
                };

                //开始进行数据库操作

                addressModel.createAddress(address)
                    .then(model => res.end(JSON.stringify(result)))
                    .then(function (err) {
                        //    当前是Reject 拒绝 状态

                        result.code = 400;
                        result.msg = "新增地址异常";
                        res.end(JSON.stringify(result));
                    });
            })
            .catch(function (err) {
                result.code = 400;
                result.msg = "用户身份错误" + err;
                res.end(JSON.stringify(result));
            });
    } catch (e) {
        result.code = 400;
        result.msg = "新增地址异常";
        console.log("address " + e.toString());
        res.end(JSON.stringify(result));
    }
});


module.exports = router;