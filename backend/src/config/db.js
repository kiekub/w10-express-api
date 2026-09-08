import mongoose from "mongoose";

export async function connectDB(){
    const uri = process.env.MONGODB_URI;

    if(!uri){
        throw new Error("MONGODB_URI is not set in the environment");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully! ✅");
};





// export async function connectDB() {
//   const uri = process.env.MONGODB_URI;


 

//  try {
//     await mongoose.connect(uri, { dbName: "jsd13-express-app" });
//     console.log("MongoDB connected successfully ✅");
//   } catch (err) {
//     console.error("MongoDB connection error ❌", err);
//    // process.exit(1);
//     throw err;
//   }
// }