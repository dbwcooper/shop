/**
 * Created by Administrator on 2017/5/4.
 */

var Shipper = require('../lib/mongo').Shipper;

module.exports = {
    //创建一个shipper对象
    createShipper:function createModel(shipper) {
        return Shipper.create(shipper).exec();
    },

    getShipperByShipperName:function get(shippername) {
        return Shipper
            .findOne({shippername:shippername})
            .exec();
    }

};