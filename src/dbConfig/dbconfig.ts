import mongoose from "mongoose";

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI!);
  const connection = mongoose.connection;
  connection.on("connect", () => {
    console.log("MONGO DB CONNECTED");
  });
};
export { connectDB };
