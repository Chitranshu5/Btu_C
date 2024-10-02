import mongoose from "mongoose";
// Replace with your MongoDB connection string
const url = "mongodb+srv://chitranshusaini8:Chitranshu@cluster0.k81bdbi.mongodb.net/dash?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
  try {
   const connect=  await mongoose.connect(url);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export { connectToDatabase };
