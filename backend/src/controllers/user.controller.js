import httpStatus from "http-Status";
import {User} from "../models/users.models.js";
import bcrypt ,{hash} from "bcrypt";
import crypto from "crypto";
import Meeting from "../models/meetings.models.js";

const login= async(req,res)=>{
    const {username ,password}=req.body;
    if(!username || !password){
return res.status(400).json({message:"Plz Provide"});
    }
    try{
const user=await User.findOne({username});
if(!user){
    return res.status(httpStatus.NOT_FOUND).json({message:"User not Found"})
}
let isPasswordCorrect= await bcrypt.compare(password,user.password);
if(isPasswordCorrect){
    let token =crypto.randomBytes(20).toString("hex");
    user.token=token;
    await user.save();
    return res.status(httpStatus.OK).json({token:token})
}else{
    return res.status(httpStatus.UNAUTHORIZED).json({"message":"Invalid Username or password"})
}
    }catch (e){
return res.status(500).json({mesage:`Something went wrong ${e}`})
    }
}

const getUserHistory=async(req,res)=>{
   const {token}=req.query;
try{
    const user= await User.findOne({token:token});
    const meetings=await Meeting.findOne({user_id:user.username})
res.json(meetings)
}catch(e){
    res.json({message:`Something went wrong ${e}`})
}
   }

// const addToHistory=async(req,res)=>{
// const {token,meeting_code}=req.body;
// try{
//     const user=await User.findOne({token:token});
//     const newMeetings=new Meeting({
//         user_id:user.username,
//         meetingCode:meeting_code
//     })
//     await newMeetings.save();
//     res.status(httpStatus.CREATED).json
// }catch(e){
//     res.json({message:`Something went wrong ${e}` })
// }
// }

 const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    });

    await newMeeting.save();

    res.status(201).json({ message: "Meeting added successfully" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};


const register=async(req,res)=>{
    const {name, username, password}=req.body;

    try{
        if (!name || !username || !password) {
  return res.status(httpStatus.BAD_REQUEST).json({
    message: "All fields are required"
  });
}
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.CONFLICT).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User({
            name:name,
            username:username,
           password:hashedPassword
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"User Registered"})
    }catch (e){
res.json({message:`Something went wriong ${e}`})
    }
}


export {login, register,getUserHistory,addToHistory};