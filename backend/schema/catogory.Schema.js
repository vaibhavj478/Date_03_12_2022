import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const cateModel = new mongoose.Schema({
  pro_cate_id: {
    type: String,
    trim: true,
    unique: true,
  },

  pro_cate_name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "User  address required"],
  },

  isDelete:{
    type:Boolean,
    default:false,

  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cateModel.pre("save", async function (next) {
  this.pro_cate_id = uuidv4();
  next();
});

const Cate = mongoose.model("Cate", cateModel);

export default Cate;
