import mongoose from "mongoose";



const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  
    });
  } catch (error) {
    console.log(error);
  }
};

export { connectDatabase };
