var user = require("../model/user.js");
var Student = require("../model/Student.js");
var crypto = require("crypto");
var formidable = require("formidable");
var url = require("url");

//显示主页
exports.xianshi = function (req,res) {

    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("xianshi",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("xianshi",{
            "login" : login,
            "yonghuming" : "",
        });
    }
}
//显示登录
exports.showLogin = function (req,res) {
    res.render("index.ejs");
}
//登录提交
exports.checklogin = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        user.findUserByName(yonghuming,function(err,doc){
            if(!doc){
                res.json({"result":-1});
                return;
            }
            if(crypto.createHmac('sha256', mima).digest('hex') === doc.mima){
                req.session.login=1;
                req.session.yonghuming = yonghuming;
                res.json({"result":1});
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        })
    })
}
//显示注册
exports.reg = function (req,res) {
    res.render("reg.ejs");
}
//验证用户名是否存在
exports.checkuserexist = function(req,res,next){
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var queryobj = url.parse(req.url,true).query;
    if(!queryobj.yonghuming){
        res.send("请提供yonghuming参数！");
        return;
    }
    user.findUserByName(queryobj.yonghuming,function(err,doc){
        if(doc){
            res.json({"result" : -1});
        }else{
            res.json({"result" : 0});
        }
    });
}
//注册提交
exports.doreg = function(req,res,next){
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        user.findUserByName(yonghuming,function(err,doc){
            if(doc){
                res.json({"result" : -1});
                return;
            }
            user.adduser(yonghuming,mima,function(err,doc){
                if(err){
                    res.json({"result" : -2})
                    return;
                }
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                res.json({"result" : 1})
            });
        });
    });
}
//退出登录
exports.tuichu = function (req,res) {

    var login = req.session.login == 0;
    var yonghuming = req.session.yonghuming = "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        //得到头像
        user.getK(yonghuming,"touxiang",function(err,v){
            res.render("index",{
                "login" : login,
                "yonghuming" : "",
            });
        });
    }else{
        res.render("index",{
            "login" : login,
            "yonghuming" : "",
        });
    }
}
//显示查询
exports.find = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("find",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("find",{
            "login" : login,
            "yonghuming" : "",
        });
    }

}
//查询所有
exports.findall=function (req, res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 10;
    Student.count({},function(err,count){
        Student.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}
//添加客户
exports.findadd = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Student.addStudent(fields,function(result){
            res.json({"result" : result});
        });
    });
}
//编辑客户
exports.check = function(req,res){
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    var sid = req.params.sid;
    console.log(sid);
    Student.find({"sid" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
//编辑完毕
exports.updateok = function(req,res){
    var sid = req.params.sid;
    console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Student.update({"sid":sid},{$set:{"name":fields.names,"phone":fields.phones,"dizhi":fields.dizhis,"shenfen":fields.shenfens,"jiazhao":fields.jiazhaos}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
//删除
exports.delete = function (req,res) {
    var sid= req.params.sid;
    Student.find({'sid':sid},function (err, results) {
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