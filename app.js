const express = require('express');

const app = express();

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

app.get("/getUSerDAta",(req,res)=>{
    try{
throw new Error("fhfgiuwrgu");
res.send("USer DAta sent")
}catch(err){
res.status(500).send("something went wrong")
    }
    });

app.listen(7777,()=>{
    console.log("bhai start h gya server");
    
});

