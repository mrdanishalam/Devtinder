const express = require('express');
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");
const validator=require('validator');
const {validateSignupData}=require("./utils/validation")
const bcrypt=require('bcrypt');
const cookieParser=require("cookie-parser");
const jwt=require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser());


//Signup new USer
app.post("/signup",async(req,res)=>{



    try{
    //Validation of data
     validateSignupData(req);
        const {firstName,lastName,emailId,password}=req.body;

        //Password Encryption //Hashing

        const passwordHash= await bcrypt.hash(password,10);
        console.log(passwordHash);
        
//Creating a new USerSchamea Instance 
const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
})
        await user.save();
//         if(data?.skills.length>10){
//     throw new Error(":Skills section Cannot be more than 10");
// }

res.send("USer Added Sucessfully");
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);
    }
});

//Login API
app.post("/Login",async(req,res)=>{


    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credeatinoals")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            //Create a JWT Token
const token =await jwt.sign({_id:user._id},"Danishhassan@2005",{
    expiresIn:"1d",
});
            //Add the token to cookie and send the response back to the user!!!

            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            })
            console.log(token);
            
            res.send("Login Syccessfully")
        }else{
            throw new Error("Invalid Credeatinoals")
        }

    }catch(err){
        res.status(500).send("Error Occuring:"+ err.message);
    }
})

//Profile API

app.get("/profile",async(req,res)=>{
    try{
    const cookies=req.cookies;
    console.log(cookies);
    

    const{token}=cookies;
    if(!token){
        throw new Error("Invalid TOken");
    }
    const decodeMeassage =await jwt.verify(token,"Danishhassan@2005");
const {_id}=decodeMeassage;
const user =await User.findById(_id);
if(!user){
    throw new Error("User does not exists!");
}

res.send(user);
}catch(err){
        res.status(500).send("Error Occuring:"+ err.message);
    }
});


//Fetch User Data
app.get("/user",async(req,res)=>{
const userEmail =req.body.emailId;

try{
    console.log(userEmail);
    const users =await User.findOne({emailId:userEmail});
    if(!users){
        res.status(404).send("User Not Found");
    }else{
        res.status(200).send(users);
    }
}catch(err){
        res.status(500).send("Error Occuring:"+ err.message);
    }
});


// Feed API - Get/Feed all the users from the database
app.get("/feed",async(req,res)=>{
try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Error:" + err.message);
  }
})

//Delete User API - Delete a user by ID
app.delete("/user/:userId",async(req,res)=>{
const userId = req.params?.userId;
const data=req.body;
try{
const DELETE_ALLOWED=["skills","about"];
const isUpdateAllowed=Object.keys(data).every((k)=>
DELETE_ALLOWED.includes(k)
);
const user =await User.deleteOne({_id:userId},data);
res.send("User Deleted Successfully")
    }catch(err){
        res.status(500).send("Error Occuring:"+ err.message);
    }
})

//Update User Of the datax
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data =req.body;
    try{
const ALLOWED_UPDATES =["age","photourl","gender","skills"];
const isUpdateAllowed =Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
);
if(!isUpdateAllowed){
    throw new Error("Update Not Allowed"); 
}
if(data?.skills.length>10){
    throw new Error(":Skills section Cannot be more than 10");
}

        const user=await User.findByIdAndUpdate({ _id: userId},data,{
            returnDocument:"after",
            runValidators:true,
        });
    res.send("User Updated Successfully")
    }catch(err){
res.status(500).send("Error Occuring:"+ err.message);
    }
})

//Update User by using emailId

// app.patch("/user",async(req,res)=>{
//     const userEmail = req.body.emailId;
//     const data=req.body;
// const data =req.body.emailId;
//     try{
//         const UpdateUser=await User.findOneAndUpdate({emailId:userEmail},data);
//     // res.send("User Updated Successfully by using emailId")
//         if(!UpdateUser){
//         res.status(404).send("User Does'nt exists!!")
//     }
//         res.status(200).send("User Updated Successfully")
// }catch(err){
// res.status(500).send("Error Occuring"+ err.message);

//     }
// })


//Sending Connection Report

app.post("/sentconnection",userAuth,async(req,res)=>{
const user=req.user;
   try{
    res.send(user.firstName +" Sending Connection Request !!")
   }catch(err){
    res.status(500).send("Error Occuring " +err.message)
}
})

connectDB()
.then(()=>{
    console.log("Databse Established Successfully");
app.listen(7777,()=>{
    console.log("bhai start h gya server");
    });
})
.catch((err)=>{
    console.log("Database connection cannot completed");
});

//This will only handle get call to /test

// app.get("/user",(req,res)=>{
// res.send({firstname:"Danish",lastname:"hassan"})
// });

// app.post("/user",(req,res)=>{
// res.send("Data SAved successfullt in DB")
// });

// app.delete("/user",(req,res)=>{
//     res.send("Data Deleted Successfully")
// });

// //This will match all HTTP modules method /test
// app.use("/test",(req,res)=>{
// res.send(" bhai logic seekh rha hun");

// });

// app.use("/sutta",(req,res)=>{
// res.send(" bhai time kahatam sutta ab nhi ");

// });

// app.use("/ganja",(req,res)=>{
// res.send(" bhai pay kar pahle");

// });

// app.use("/",(req,res)=>{
// res.send(" bhai dekh koi bhadiyan sa daal le");

// });

// app.use( (req, res) => {
//     res.send("Hello from Dashboard se");
// });


//======= MULTIPLE ROUTE HANDELERS & MIDDLEWARE CHAINING (Multiple Handler Chaining)======//

// app.get(
//   "/user",
//   // Handler 1
//   (req, res, next) => {
//     console.log("Handling the route user 1!!");
//     next();
//   },
//   (req,res,next) =>{
//     console.log("Handling the route user 2!!");
//     // res.send("Handler 2")
//     next();
// },
// (req,res,next) =>{
//     console.log("Handling the route user 3!!");
//     // res.send("Handler 3")
//     next();
// },
// (req,res,next) =>{
//     console.log("Handling the route user 4!!");
//     // res.send("Handler 4")
//     next();
// },
// (req,res,next) =>{
//     console.log("Handling the route user 5!!");
   
//     res.send("Handler 5")
//     next();
// } 
// );


//=== Dummy Auth For Admin Middleware || User


// const {adminAuth , userAuth}=require("./middlewares/auth");

// app.use("/admin" , adminAuth);
// // app.use("/user",userAuth);

// app.post("/user/login",(req,res)=>{
// res.send("User Login Is going on , Welcome abroad!!!")
// });

// app.get("/user/data",userAuth ,(req,res)=>{
//     res.send("User side data will send")
// })

// app.get("/admin/getdata",(req,res)=>{
//     res.send("Data send bhai check karle jakar");
// });

// app.get("/admin/deletedata",(req,res)=>{
//     res.send("Deleted User data successfully");
// });


//====== Error Handling ========///

// app.get("/getUSerDAta",(req,res)=>{
//     try{
// throw new Error("fhfgiuwrgu");
// res.send("USer DAta sent")
// }catch(err){
// res.status(500).send("something went wrong")
//     }
//     });



