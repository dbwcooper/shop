/**
 * Created by Administrator on 2017/5/4.
 */

var Goods = require('../lib/mongo').Goods;


module.exports = {
    create:function create(goods) {
        return Goods.create(goods);
    }
};

