import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  deleteProductTrash,
  getProductTrash,
} from "../api/product.api.js";
import isAuthenticated from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/product", isAuthenticated, getProduct);
productRouter.post("/product/create", isAuthenticated, createProduct);
// productRouter.put('/product/:id',isAuthenticated , updateProduct);
productRouter.delete("/product/:id", isAuthenticated, deleteProduct);
productRouter.get( "/dustbin" , isAuthenticated, getProductTrash)
  
  
 productRouter.delete("/dustbin/:id", isAuthenticated, deleteProductTrash);

export default productRouter;
