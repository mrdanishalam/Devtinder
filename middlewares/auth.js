const adminAuth =(req,res,next)=>{
    console.log("AdminAuth is checked successfully  !!!");
    const token="abcd";

    const isadminAuth = token ==="abcd";

    if(!isadminAuth){
        res.status(401).send("Unauthorized Requests")
    }else{
        next();
    }
    
}

//For User Section

const userAuth =(req,res,next)=>{
    console.log("userAuth is checked successfully  !!!");
    const token="abcd";

    const isuserAuth = token ==="abcd";

    if(!isuserAuth){
        res.status(401).send("Unauthorized Requests")
    }else{
        next();
    }
    
}



module.exports={
    adminAuth,
    userAuth

}