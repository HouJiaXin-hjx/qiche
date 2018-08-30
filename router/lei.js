var user = require("../model/user.js");
var Lei = require("../model/lei.js");
var formidable = require("formidable");
var url = require("url");


exports.lei = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("lei",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("lei",{
            "login" : login,
            "yonghuming" : "",
        });
    }

}
//查询所有
exports.leiall=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 10;
    Lei.count({},function(err,count){
        Lei.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
//添加客户
exports.leiadd = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Lei.addCar(fields,function(result){
            res.json({"result" : result});
        });
    });
}
//编辑客户
exports.checkss = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var sid = req.params.sid;
    Lei.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
//编辑完毕
exports.updateokss = function(req,res){
    var sid = req.params.sid;
    console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Lei.update({"sid":sid},{$set:{"name":fields.names}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
//删除
exports.deletess = function (req,res) {
    var sid= req.params.sid;
    Lei.find({'sid':sid},function (err, results) {
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