const validator=require('validator');
const validateSignupData=(req)=>{
        const {firstName, lastName,emailId,password}=req.body;

        if(!firstName ||!lastName){
            throw new Error("You should enter name")
        }else if(!validator.isEmail(emailId)){
            throw new Error("Email is not  right!!")
        }else if(!validator.isStrongPassword(password)){
            throw new Error("Password is not Strong.. Please Enter a strong Password")
        }
};

module.exports={
    validateSignupData,
};