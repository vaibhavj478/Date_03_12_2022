import mongoose from "mongoose";

import dotenv from "dotenv";

import jwt from "jsonwebtoken";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "User  UserName required"],
    },
    images: {
      // public_id: String,
      // url: String,
      type:String,
      default:"http://graph.facebook.com/{user-id}/picture?type=large",
    },
    address: {
      type: String,
      trim: true,
      required: [true, "User  address required"],
    },
    mobile: {
      type: String,
      unique: true,
      required: [true, "User  Email required"],
    },
    authorization:{
      type:String,
      default:"user",
      enum:["user","admin"],
    }
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET || "iamBadGuyAndThisForJWT"
  );
};
userSchema.methods.isMatch = async function (mobile) {
console.log(mobile, this.mobile)
  if(mobile === this.mobile){
    return true
  }else{
    return false
  }
};


const User = mongoose.model("User", userSchema);

export default User;
