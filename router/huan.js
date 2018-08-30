var user = require("../model/user.js");
var Que = require("../model/Que.js");
var formidable = require("formidable");
var Gai = require("../model/Gai.js");

exports.huan = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("huan",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("huan",{
            "login" : login,
            "yonghuming" : "",
        });
    }
}

exports.que = function (req,res) {
    console.log(req);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.ren);
        Que.add(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.ques = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    Que.count({},function(err,count){
        Que.find({}).exec(function(err,results){
            res.json({"result":results});
        });
    });
}
exports.delet = function (req,res) {
    var sid= req.params.sid;
    Gai.find({'sid':sid},function (err, results) {
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
