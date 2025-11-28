const express = require('express');

const app = express();

//This will only handle get call to /test
app.get("/user",(req,res)=>{
res.send({firstname:"Danish",lastname:"hassan"})
});

app.post("/user",(req,res)=>{
res.send("Data SAved successfullt in DB")
});

app.delete("/user",(req,res)=>{
    res.send("Data Deleted Successfully")
});

//This will match all HTTP modules method /test
app.use("/test",(req,res)=>{
res.send(" bhai logic seekh rha hun");

});

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




app.listen(7777,()=>{
    console.log("bhai start h gya server");
    
});

