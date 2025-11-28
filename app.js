const express = require('express');

const app = express();


app.use("/test",(req,res)=>{
res.send(" bhai logic seekh rha hun");

});

app.use("/sutta",(req,res)=>{
res.send(" bhai time kahatam sutta ab nhi ");

});

app.use("/ganja",(req,res)=>{
res.send(" bhai pay kar pahle");

});
app.use( (req, res) => {
    res.send("Hello from Dashboard se");
});




app.listen(7777,()=>{
    console.log("bhai start h gya server");
    
});

