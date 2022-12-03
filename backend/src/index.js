

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"

import { connectDatabase } from '../config/database.js';
import { userRoutes } from '../routes/user.Routes.js';
import cateRouter from '../routes/catogory.routes.js';
import productRouter from '../routes/product.routes.js';





const app = express();

// setting middleware 
app.use(express.json());
app.use(cors());
app.use(cookieParser());


dotenv.config()




app.use("/api/v1", userRoutes)
app.use("/api/v1", cateRouter)
app.use("/api/v1", productRouter)



const port = process.env.PORT || '8080'


app.listen(port,async()=>{

try {
    
   await connectDatabase();
    console.log(`http://${process.env.HOST}:${port}`)
} catch (error) {
    console.log(error);
}

})
