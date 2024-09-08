const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const signUpUser = async (req,res) =>{
    try{
        const {firstName,lastName,email,password,userId} = req.body;
        console.log("request body is",req.body);
        const hashedPassword = await bcrypt.hash(password,10);
        let userDetails ={
            userId,
            firstName,
            lastName,
            email,
            password:hashedPassword
        }

        const newUser = new User(userDetails);
        let result= await newUser.save();
        let resultObject = result.toObject();
        delete resultObject.password;
        resultObject.statusCheck="success";
        console.log("sending res");
        console.log("check ",resultObject);
        res.status(200).json(resultObject);
    }catch(error){
        console.error("Error occured in sign up user",error);
        res.status(500).json(error);
    }

}


const signInUser = async (req,res) =>{
    try{
        let {email,password}=req.body;
        // check if user with given email exists or not
        const alreadyUser = await User.findOne({email});
        console.log("alreadyUser",alreadyUser);
        if(!alreadyUser){
            res.status(200).json({msg:"user with given email does not exists"});
        }

        const isCorrectPassword = await bcrypt.compare(password,alreadyUser.password);
        console.log("isCorrectPassWord",isCorrectPassword);
        if(!isCorrectPassword){
          return  res.status(200).json({msg:"Invalid Credentials"});
        }
        let resultObject = {
            userId:alreadyUser.userId,
            statusCheck:"success"
        }
        res.status(200).json(resultObject);
    }catch(error){
        console.error("Error is",error);
    }
}


module.exports ={
    signUpUser,
    signInUser
}