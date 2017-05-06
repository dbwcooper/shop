
module.exports = function (app) {
    app.get('/',function (req,res) {
        res.writeHead(200,{"Content-Type":"application/json"});
        r
        res.render('index.ejs'); //定位到首页
    });

    //后台接口
    app.use('/api',require('./api'));

};