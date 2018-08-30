var mongoose = require('mongoose');

var queSchema = new mongoose.Schema({
    sid  : Number ,
    name : String,
    ren : String,
    time  : String ,
    mei:Number,
    he:Number
});


queSchema.statics.add = function(json,callback){
    Que.checkSid(json.ren,function(torf){
        if(torf){
            var s = new Que(json);
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

queSchema.statics.checkSid = function(ren,callback){
    this.find({"ren" : ren} , function(err,results){
        callback(results.length == 0);
    });
}
var Que = mongoose.model("Que",queSchema);
module.exports = Que;

