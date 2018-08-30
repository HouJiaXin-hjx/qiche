var user = require("../model/user.js");
var Car = require("../model/car.js");
var formidable = require("formidable");
var url = require("url");


exports.car = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("car",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("car",{
            "login" : login,
            "yonghuming" : "",
        });
    }

}
//查询所有
exports.carall=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 10;
    Car.count({},function(err,count){
        Car.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
//添加客户
exports.caradd = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Car.addCar(fields,function(result){
            res.json({"result" : result});
        });
    });
}
//编辑客户
exports.checks = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var sid = req.params.sid;
    // console.log(sid);
    Car.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
//编辑完毕
exports.updateoks = function(req,res){
    var sid = req.params.sid;
    // console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Car.update({"sid":sid},{$set:{"name":fields.names,"suo":fields.suos,"price":fields.prices,"danwei":fields.danweis,"tai":fields.tais}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.updateok = function(req,res){
    var sid = req.params.sid;
    // console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Car.update({"sid":sid},{$set:{"tai":fields.tais}},function (err) {
            console.log(fields.tais);
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
//删除
exports.deletes = function (req,res) {
    var sid= req.params.sid;
    Car.find({'sid':sid},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}