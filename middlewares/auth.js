
const jwt =require("jsonwebtoken");
const User =require("../models/user");

//For User Section

const userAuth =async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("TOken is not valid!!!")         
        }

        const decodeObj=await jwt.verify(token,"Danishhassan@2005");

        const {_id}=decodeObj;

        const user =await User.findById(_id);
        if(!user){
            throw new Error("User not found")
        }
        req.user=user;
        next();

    }catch(err){
        res.status(400).send("ERROR:"+err.meassage)
    }
    
}



module.exports={
    userAuth
}