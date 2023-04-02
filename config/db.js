import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = mongoose
      .connect(process.env.MONGO_URI, { dbName: "eShop" })
      .then(() => console.log(`Connected!`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
