const mongoose=require("mongoose");
const validator = require("validator");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
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
        // select:false,
         validate(value) {
      if (!validator.isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })) {
        throw new Error("Password is to week! , Password must contain (one Symbols , one capitalletter & Numbers)");
      }
    }
    },
    gender:{
        type:String,
        validator:value=>["male","female","other"].includes(value),
        message:"Gender must  be either male , female , or other"
    },
    photourl:{
        type:String,
    },
    about:{
        type:String,
        default:"Hassan Empire!!!!"
    },
    skills:{
        type:[String],
    }
    
},
{
    timestamps:true,
});


userSchema.methods.getJWT =async function(){
    const user=this;

    const token =await jwt.sign({_id:user._id},"Danishhassan@2005",{
        expiresIn:"1d",
    });
    return token;
}

userSchema.methods.validatePassword=async function (passwordInputByUser){
    const user =this;
    const passwordHash=user.password;
     const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
     return isPasswordValid;
}




module.exports=mongoose.model("User",userSchema);