import mongoose from "mongoose";

export default async function connectDB() {

  try {
    mongoose.set('bufferTimeoutMS', 60000)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferTimeoutMS: 20000
    });
    if (!conn) throw new Error("Error encounterd while connecting to database");

    console.log(`successfully connected to ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
}
