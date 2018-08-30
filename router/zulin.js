var user = require("../model/user.js");
var Lei = require("../model/lei.js");
var Car = require("../model/car.js");
var Gai = require("../model/Gai.js");
var formidable = require("formidable");
var url = require("url");


exports.zu = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("zulin",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("zulin",{
            "login" : login,
            "yonghuming" : "",
        });
    }
}
exports.zuall=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    Lei.count({},function(err,count){
        Lei.find({}).exec(function(err,results){
            res.json({"result":results});
        });
    });
}
exports.zualls=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    Car.count({},function(err,count){
        Car.find({}).exec(function(err,results){
            res.json({"result":results});
        });
    });
}
exports.gai = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        Gai.addCar(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.ha=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    Gai.count({},function(err,count){
        Gai.find({}).exec(function(err,results){
            res.json({"result":results});
        });
    });
}