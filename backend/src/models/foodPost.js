import mongoose from "mongoose";

const foodPostSchema = new mongoose.Schema({
    restaurantId : { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true },
    food_name : { type : String, required : true },
    quantity : { type : String, default : "Not specified" },
    description : String,
    expiry_time : { type : Date, required : true},
    location : {
    type : { type : String, enum : ["Point"], default : "Point" },
    coordinates : { type : [Number], required : true } // [lng, lat]
    },
    status : { type : String, enum : ["available","claimed","collected","expired"], default : "available" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    claimedBy : { type : mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    food_image : [
    {
      url : String,
      public_id : String
    }
  ],
    claimedAt: Date,
    collectedAt : Date,
    expiredAt: {type: Date,default: null},
}, { timestamps: true });

foodPostSchema.index({ location : "2dsphere"});

export default mongoose.model("FoodPost", foodPostSchema);