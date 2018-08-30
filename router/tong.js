var user = require("../model/user.js");
var Gai = require("../model/Gai.js");


exports.showtong = function (req,res) {
    var login = req.session.login == 1 ? true : false;
    var yonghuming = login ? req.session.yonghuming : "";
    if(!(req.session.login && req.session.yonghuming == yonghuming)){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    if(yonghuming) {
        user.getK(yonghuming,function(err){
            res.render("tong",{
                "login" : login,
                "yonghuming" : yonghuming,
            });
        });
    }else{
        res.render("tong",{
            "login" : login,
            "yonghuming" : "",
        });
    }
}
exports.all=function (req, res) {
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

