import Product from "../schema/product.Schema.js";

import Cate from "../schema/catogory.Schema.js";

export const getProduct = async (req, res) => {
  try {
    const pro_name = req.query?.pro_name || undefined;
    const page = Number(req.query?.page);
    console.log(page);

    if (pro_name !== undefined) {
      const cate = await Product.find({ pro_name })
        .limit(2)
        .skip(page * 2 || 0);

      const cnt = await Product.find({ pro_name }).count();

      return res.status(200).send({
        success: true,
        cate,
        per_page: 2,
        total_page: Math.ceil(cnt / 2),
      });
    }

    const cate = await Product.find()
      .limit(2)
      .skip(page * 2 || 0);

    const cnt = await Product.find().count();

    return res.status(200).send({
      success: true,
      cate,
      per_page: 2,
      total_page: Math.ceil(cnt / 2),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { pro_name } = req.body;

    // console.log(req);

    const check = await Product.find({ pro_name });

    if (check.length) {
      return res.status(400).send({
        success: false,
        message: "category already their",
      });
    }

    const pro_cateId = [];
// one to many relation
    for (let i = 0; i < req.body?.cate.length; i++) {
        let cr ={}
         cr.pro_cate_name = req.body?.cate[i] 
      const cate = await Cate.findOne(cr );

      if(!cate){

        return res.status(400).send({
            success:false,
            message:"category are not valid"
        })
      }

      pro_cateId.push(cate._id);
    }

    req.body.pro_cateId = pro_cateId;

    const product = await Product(req.body);

    product.save();

    res.status(201).send({
      success: true,
      message: "Product added",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { pro_cate_name } = req.body;

    const cate = await Cate.findById(id);

    if (!cate) {
      return res.status(404).send({
        success: false,
        message: "category not found",
      });
    }

    cate.pro_cate_name = pro_cate_name;

    await cate.save();

    res.status(200).send({
      success: true,
      message: "category updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const cate = await Product.findById(id);

    if ( !cate.isDelete) {
     
        cate.isDelete = true;
        await cate.save();
        return res.status(200).send({
          success: true,
          message: "product in trash",
        });
    } 

    return res.status(400).send({
        success: true,
        message: "product is already in trash",
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProductTrash = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const product = await Product.findById(id);

    if ( product.isDelete) {
     
        await product.remove();
        return res.status(200).send({
          success: true,
          message: "Product removed",
        });
    } 

    return res.status(400).send({
        success: false,
        message: "not removed",
      });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


export const getProductTrash =async(req,res)=>{
  try {

    
      const   product = await Product.find({isDelete:true});

      res.status(200).send({
        success:true,
        product
      })


  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}