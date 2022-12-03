import Cate from "../schema/catogory.Schema.js";
import Product from "../schema/product.Schema.js";

export const getCategory = async (req, res) => {
  try {
    const pro_cate_name = req.query?.pro_cate_name || undefined;
    const page = Number(req.query?.page)
    console.log(page);

    if (pro_cate_name !== undefined) {
      const cate = await Cate.find({ pro_cate_name }).limit(2).skip(page*2 || 0 )
       

      const cnt = await Cate.find({ pro_cate_name }).count();

      return res.status(200).send({
        success: true,
        cate,
        per_page:2,
        total_page: Math.ceil(cnt / 2),
      });
    }

    const cate = await Cate.find().limit(2).skip(page*2 || 0)
     

    const cnt = await Cate.find().count();

    return res.status(200).send({
      success: true,
      cate,
      per_page:2,
      total_page: Math.ceil(cnt / 2),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { pro_cate_name } = req.body;

    // console.log(req);

    const check = await Cate.find({ pro_cate_name });

    if (check.length) {
      return res.status(400).send({
        success: false,
        message: "category already their",
      });
    }

    const cate = await Cate({ pro_cate_name });

    cate.save();

    res.status(201).send({
      success: true,
      message: "category added",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const cate = await Cate.findById(id);

    // if category delete / delete all product
    if (cate.isDelete) {

      let id = cate._id

      await cate.remove();

      const product = await Product.find({pro_cateId:id})

      for(let i =0 ;i< product.length ;i++){

        let pro =    await Product.findById(product[i]._id);

        await pro.remove();

      }
      
      



      return res.status(200).send({
        success: true,
        message: "Category remove",
      });
    } else {
      cate.isDelete = true;
      await cate.save();

      return res.status(200).send({
        success: true,
        message: "Category in trash",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
