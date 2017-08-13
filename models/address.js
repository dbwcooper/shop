/**
 * Created by Administrator on 2017/5/4.
 */

var Address = require('../lib/mongo').Address;



module.exports = {

    // 创建一个地址
    createAddress : function create(address) {

        // 返回当前的promise 对象 但是当前promise正在进行中 pending状态
        // let promise = Address.create(address,function (err) {
        //     if(err){
        //         console.log(err);
        //     }else{
        //         console.log('insert address success')
        //     }
        // }).then(function (model) {
        //     console.log(model);
        // });
        //
        // console.log(promise); 所以这里一直是 promise pending状态

        return Address.create(address,function (err) {
            if(err){
                console.log(err);
            }else{
                console.log('insert address success')
            }
        });

    },

    // 更新一个地址
    updateOneAddress : function update(address) {
        return Address.updateOne(address);
    },


    //根据 token 拿到自己所有的  地址信息
    getOwnAddress: function getaddressByName(user) {

        return Address.find({user:user});
    },

    //根据 用户id 和 地址id拿到对应地址信息
    getOneAddress: function getOneByuserIdAndAddressId(user,addressId) {
        return Address.findOne({user:user,_id:addressId});
    },
    //根据用户和地址删除一个地址
    deleteOneAddress : function (userId,addressId) {
        return Address.deleteOne({user:userId,_id:addressId});
    }

};