var mongoose = require('mongoose');

var leiSchema = new mongoose.Schema({
    sid  : Number ,
    name : String
});


leiSchema.statics.addCar = function(json,callback){
    Lei.checkSid(json.sid,function(torf){
        if(torf){
            var s = new Lei(json);
            s.save(function(err){
                if(err){
                    callback(-2);
                    return;
                }
                callback(1);
            });
        }else{
            callback(-1);
        }
    });
}

leiSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}
var Lei = mongoose.model("Lei",leiSchema);
module.exports = Lei;

