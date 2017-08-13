


module.exports = function (app) {

    //后台接口
    app.use('/api',require('./api'));

    //前台
    app.get('/',function (req,res) {
        res.render('index.ejs'); //定位到首页
    });

    // app.use('/signup',require('./stage/signup'));
};