

import express from "express"
import { createCategory, deleteCategory, getCategory, updateCategory } from "../api/catogory.api.js";
import isAuthenticated from "../middleware/auth.js"


const cateRouter = express.Router()


cateRouter.post('/category/create',isAuthenticated , createCategory);
cateRouter.get('/category',isAuthenticated , getCategory);
cateRouter.put('/category/:id',isAuthenticated , updateCategory);
cateRouter.delete('/category/:id',isAuthenticated , deleteCategory );



export default cateRouter