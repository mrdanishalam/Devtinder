const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        // unique:true,
        match:[/@/, "Email must contain @ Symbols. "]
    },
    age:{
        type:Number,
        min:18,
        max:50
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        maxlength:15
    },
    gender:{
        type:String,
        validator:value=>["male","female","other"].includes(value),
        message:"Gender must  be either male , female , or other"
    },
    photo:{
        type:String,
    },
    about:{
        type:String,
        default:"Hassan Empire!!!!"
    }
    
},
{
    timestamps:true,
});





module.exports=mongoose.model("User",userSchema);