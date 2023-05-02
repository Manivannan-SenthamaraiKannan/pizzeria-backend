import mongoose from "mongoose";

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connection Established");
    }
    catch(error){
        console.log("Error While Connecting DB",error)
    }
}

export default db;