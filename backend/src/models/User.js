import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, unique: true, required : true, lowercase : true,},
    password : {type : String, required : true},
    role : { type : String, enum : ["restaurant", "ngo"], required : true },
    address : { type: String, required : true},
    avatar : {
    url : String,
    public_id : String,
    },
    location : {
    type : { type : String, enum : ["Point"], default : "Point" },
    coordinates : { type : [Number], default : [0, 0] } // [lng, lat]
    },
    contactInfo : {type : String, required : true}
}, { timestamps : true });

userSchema.index({ location : "2dsphere"});

export default mongoose.model("User", userSchema);