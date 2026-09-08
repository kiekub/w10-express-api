import mongoose from "mongoose";

export async function connectDB(){
    
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully! ✅");

    if(!uri){
        throw new Error("MONGDB_URI is note set in the environment")
    }

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