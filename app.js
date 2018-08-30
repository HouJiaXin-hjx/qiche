var express = require("express");
var app = express();

var router = require("./router/router.js");
var car = require("./router/car.js");
var lei = require("./router/lei.js");
var zulin = require("./router/zulin.js");
var huan = require("./router/huan.js");
var tong = require("./router/tong.js");

var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/car');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");
app.use(express.static("static"));
app.use(express.static("views"));

//显示主页------
app.get("/xianshi",router.xianshi);
//显示登录
app.get("/",router.showLogin);
//登录提交
app.post("/checklogin",router.checklogin);
//显示注册
app.get("/reg",router.reg);
//验证用户名是否存在
app.get("/checkuserexist",router.checkuserexist);
//注册提交
app.post("/doreg",router.doreg);
//退出登录
app.get("/tuichu",router.tuichu);

//人员查询---------
//显示查询
app.get("/find",router.find);
//查询所有
app.get("/findall",router.findall);
//添加客户
app.post("/findadd",router.findadd);
//编辑客户
app.get('/find/:sid',router.check);
//编辑完成
app.post('/find/:sid',router.updateok);
//删除
app.delete('/delete/:sid', router.delete);


//汽车档案----------
//显示查询
app.get("/car",car.car);
//查询所有
app.get("/carall",car.carall);
//添加客户
app.post("/caradd",car.caradd);
//编辑客户
app.get('/car/:sid',car.checks);
//编辑完成
app.post('/car/:sid',car.updateoks);
app.post('/gai/:sid',car.updateok);
//删除
app.delete('/deletes/:sid', car.deletes);

//类别管理------
//显示查询
app.get("/lei",lei.lei);
//查询所有
app.get("/leiall",lei.leiall);
//添加
app.post("/leiadd",lei.leiadd);
//编辑
app.get('/lei/:sid',lei.checkss);
//编辑完成
app.post('/lei/:sid',lei.updateokss);
//删除
app.delete('/deletess/:sid', lei.deletess);

//租赁------
//显示
app.get("/zu",zulin.zu);
//显示租赁左边
app.get("/zuall",zulin.zuall);
//显示租赁右边
app.get("/zualls",zulin.zualls);
//提交更改
app.post("/gai",zulin.gai);
//得到更改后的全部
app.get("/ha",zulin.ha);

//归还-----
//显示
app.get("/huan",huan.huan);
//归还确认
app.post("/que",huan.que);
app.get("/que",huan.ques);
//删除
app.delete('/delet/:sid', huan.delet);


//统计-----
//显示
app.get("/tong",tong.showtong);
app.get("/tongall",tong.all);


app.listen(4000);