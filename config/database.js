const mongoose =require("mongoose");


const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://aadab_nodejs:Danish%402005@aadabnodejs.7wb5qxe.mongodb.net/devTinder"
    );
}

module.exports=connectDB;