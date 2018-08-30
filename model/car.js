var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    sid  : Number ,
    name : String ,
    suo : String,
    price : String,
    danwei : String,
    tai:String
});


carSchema.statics.addCar = function(json,callback){
    Car.checkSid(json.sid,function(torf){
        if(torf){
            var s = new Car(json);
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


carSchema.statics.checkSid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
}


var Car = mongoose.model("Car",carSchema);
module.exports = Car;