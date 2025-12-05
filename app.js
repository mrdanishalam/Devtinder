const express = require('express');
const app = express();
const connectDB=require("./config/database");
const User=require("./models/user");

app.use(express.json());
app.post("/signup",async(req,res)=>{
    //Creating a new USerSchamea Instance \

    const user= new User(req.body);
    try{
        await user.save();
        res.send("USer Added Sucessfully");
    }catch(err){
        res.status(400).send("Error Occuring:"+ err.message);
    }
});

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

})

//Delete User API - Delete a user by ID
app.delete("/user",async(req,res)=>{
const userId = req.body.userId;

    try{

const user =await User.findByIdAndDelete(userId);
res.send("User Deleted Successfully")
    }catch(err){
        res.status(500).send("Error Occuring:"+ err.message);
    }
})

//Update User Of the datax

app.patch("/user",async(req,res)=>{
    const userId = req.body.userId;
const data =req.body;
    try{
        const user=await User.findByIdAndUpdate({userId},data,{
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


//======= MULTIPLE ROUTE HANDELERS & MIDDLEWARE CHAINING ======//

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
