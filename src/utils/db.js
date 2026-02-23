import mongoose from "mongoose";

// export default async function connectDB() {

//   try {
//     mongoose.set('bufferTimeoutMS', 60000)
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       bufferTimeoutMS: 20000
//     });
//     if (!conn) throw new Error("Error encounterd while connecting to database");

//     console.log(`successfully connected to ${conn.connection.host}`);
//   } catch (err) {
//     console.error(err);
//   }
// }


// Set this AT THE TOP of your file, before any model imports
mongoose.set('bufferTimeoutMS', 60000); 

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return; // Reuse connection

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Wait 30s to find the server
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Connection error:", err);
  }
}
