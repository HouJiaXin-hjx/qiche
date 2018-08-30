var mongoose = require('mongoose');

var gaiSchema = new mongoose.Schema({
    sid  : Number ,
    name : String ,
    people:String,
    ren:String,
    shi : Number,
    mei : Number,
    price : Number,
    zu:String
});


gaiSchema.statics.addCar = function(json,callback){
    Gai.checkSid(json.sid,function(torf){
        if(torf){
            var s = new Gai(json);
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


gaiSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}


var Gai = mongoose.model("Gai",gaiSchema);
module.exports = Gai;