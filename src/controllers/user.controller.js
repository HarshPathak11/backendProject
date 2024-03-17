import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadLocalFile} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'
const userRegister=asyncHandler(async (req,res)=>{
   // get user details from frontend
   // validation- not empty
   // check if the user already exists
   // check for images, check for avatar
   // upload these media on cloudinary
   // create user object - create a new entry in DB
   // check if the user is created
   // return response







   
   const {fullname, email, password, username} =req.body
   if(fullname==="")
   {
      throw new ApiError(400,"Fullname is required")
   }
   if(email===""){
      throw new ApiError(400,"Email is required")
   }
   if(password===""){
      throw new ApiError(400,"Password is required")
   }
   if(username===""){
      throw new ApiError(400,"username is required")
   }
   

   const existedUser= await User.findOne({
      $or:[{email},{username}]
   })

   if(existedUser)
   throw new ApiError(409,"User Already exists")
   console.log(req.files)
   const avatarPath=req.files?.avatar[0]?.path //usinng multer to get the original path of the file - ise rtt lo
   // const coverPath=req.files?.coverImage[0]?.path
   if(!avatarPath)
   throw new ApiError(400,"avatar missing")
   // if(!coverPath)
   // throw new ApiError(400,"cover image required");
  
    
   const avatar=await uploadLocalFile(avatarPath)
   // const coverImage= await uploadLocalFile(coverPath)
   if(!avatar)
   throw new ApiError(400,"avatar missing") 


   //creating the user
  const user= await User.create({
      fullname,
      avatar:avatar.url,
      // coverImage:coverImage?.url||"",
      email,
      password,
      username
   })
   //checking if user is formed
   const createdUser= await User.findById(user._id).select(
      "--password --refreshToken"
   )
   if(!createdUser)
   throw new ApiError(500,"something went wrong while registering hte user")
   
   console.log(createdUser)
   return res.status(201).json(
      new ApiResponse(200,"User Registerd Successfully")
   )
}  
)


const generateAccessandRefreshToken=async (userID)=>{
   try {
      const user=await User.findById(userID)
      const accessToken=user.generateAccessToken();
      const refreshToken=user.generateRefreshToken();
      user.refreshToken=refreshToken

      //saving the changes made in the user from DB
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}
      
   } catch (error) {
      throw new ApiError(500, "Something went wrong while making tokens")
   }
}



const userLogin=asyncHandler(async (req,res)=>{
   // get the data from the req.body
   // check whether the user or email exists
   // find the user
   // match the password
   // generate access and refresh token
   // send the above two using cookie
  console.log(req.body)
   const {email,username,password}=req.body
   // if(!email && !username)
   // throw new ApiError(400,"username or email is required")
   console.log(email,username)
   const user=await User.findOne({
      $or:[{username},{email}]
   })

   if(!user)
   throw new ApiError(404,"User Not Found")
  console.log(user)
  const isPassWordOk= await user.isPasswordCorrect(password)
  if(!isPassWordOk)
  throw new ApiError(401,"Invalid Password")

 // generating tokens
 const {accessToken,refreshToken}= await generateAccessandRefreshToken(user._id)

 const loggedUser=await User.findById(user._id);

 const options={
   httpOnly:true,
   secure:true
 }

 return res.status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(
   new ApiResponse(200,{
      user:loggedUser,
      accessToken,refreshToken
   },
   "User Logged In Succefully")
 )

} )



const logoutUser=asyncHandler(async (req,res)=>{
   User.findByIdAndUpdate(req.user._id,{
      $set:{
         refreshToken:undefined
      }
   })

   const options={
      httpOnly:true,
      secure:true
    }
   
    return res.status(200)
    .clearCookie("accessToken",accessToken,options)
    .clearCookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(200,{},
      "User Logged In Succefully")
    )

})
export {userRegister,userLogin,logoutUser}