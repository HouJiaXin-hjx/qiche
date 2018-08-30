var mongoose = require("mongoose");

var crypto = require('crypto');

var userSchema = mongoose.Schema({
    yonghuming:String,
    mima:String,
})

var user = mongoose.model("user",userSchema);

exports.findUserByName = function(yonghuming , callback){
    user.findOne({"yonghuming" : yonghuming} , function(err,doc){
        callback(err,doc);
    });
}
exports.adduser = function(yonghuming,mima,callback){
    var jiamidemima = crypto.createHmac('sha256', mima).digest('hex');
    user.create({"yonghuming" : yonghuming , "mima" : jiamidemima},function(err,doc){
        callback(err,doc)
    });
}
exports.getK = function (yonghuming,callback) {
    user.findOne({"yonghuming":yonghuming},function (err,doc) {
        callback(err,doc);
    })
}
