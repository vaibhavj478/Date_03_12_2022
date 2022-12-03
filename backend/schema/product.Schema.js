import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  pro_cateId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cate",
    },
  ],

  pro_name: {
    type: String,
  },
  pro_img: {
    type: String,
    default: "image url",
  },
  pro_price: {
    type: Number,
    trim: true,
  },

  isDelete:{
    type:Boolean,
    default:false,

  },
  status: {
    type: String,
    enum: ["active", "deactive"],
    default:"active"
  },
});


productSchema.pre("save", async function (next) {
    if (this.isModified("pro_price")) {
      this.pro_price =  Number(this.pro_price);
    }
  
    next();
  });

const Product = mongoose.model("Product", productSchema);

export default Product