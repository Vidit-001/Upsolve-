import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";

import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest, IUserDocument } from "../types/custom.js";

const generateAccessAndRefreshTokens = async(userId: string) =>{
    try {

    const user = await User.findById(userId) as IUserDocument | null;
    if (!user) throw new Error("User not found");
    const accessToken = user.generateAccessToken ? user.generateAccessToken() : "";
    const refreshToken = user.generateRefreshToken ? user.generateRefreshToken() : "";
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const registerUser = asyncHandler(async (req,res) => {
    const{fullName,email,username,password} = req.body;
    
    if(!fullName || !email || !username || !password){
        throw new ApiError(400,"Please provide all fields")
    }

    const existedUser = await User.findOne({
        $or: [{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    // Skipping Cloudinary image upload, just create user with default avatar/coverImage
    const user = await User.create({
        fullName,
        avatar: "",
        coverImage: "",
        email,
        password,
        username: username.toLowerCase(),
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"User not created")
    }
    return res.status(201).json(new ApiResponse(200,"User created",createdUser))
})
const loginUser = asyncHandler(async(req,res)=>{
  const {username,email,password} = req.body;
    // console.log("email:",email);

  // validate the fields
  if(!username && !email){
      throw new ApiError(400,"Please provide username or email")
  }
    // search for user in db
    const user = await User.findOne({
        $or : [{username},{email}]
    }) as IUserDocument | null;
    if(!user){
            throw new ApiError(404,"User not found")
    }

    // check for password
    const isPasswordValid = user.isPasswordCorrect ? await user.isPasswordCorrect(password) : false;
    if(!isPasswordValid){
            throw new ApiError(401,"Invalid password")
    }
    // generate access token and refresh token
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens((user._id as any).toString());
    const loggedInUser =  await User.findById((user._id as any).toString()).select("-password -refreshToken");
    // send cookie
    const options = {
                httpOnly : true,
                secure : true
    };
    return res.status(200).cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(200, "User logged in", {
                user : loggedInUser,
                accessToken : accessToken,
                refreshToken : refreshToken
        }));
})
const logoutUser = asyncHandler(async(req,res)=>{
    // remove the refresh token from the database
    // remove the cookie
    await User.findByIdAndUpdate(
    (req as AuthenticatedRequest).user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly : true,
        secure : true
   }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,undefined,"User logged out"))
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new ApiError(500, "Missing REFRESH_TOKEN_SECRET in environment");
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        ) as { _id?: string };
        const user = await User.findById((decodedToken as any)?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }
        const options = {
            httpOnly: true,
            secure: true
        };
        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens((user._id as any).toString());
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, "Access token refreshed", {accessToken, refreshToken: newRefreshToken}));
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }

})
const changeCurrentPassword = asyncHandler(async(req,res)=>{
    // get current password and username and new password
    // validate the fields
    // check if user exists
    // match the password
    // change the password
    // send response
    const {currentPassword,newPassword} = req.body;
    console.log("current password ",currentPassword);
    console.log("new password",newPassword);
    if(!currentPassword || !newPassword){
        throw new ApiError(400,"Please provide all fields")
    }
    const user = await User.findById((req as AuthenticatedRequest).user?._id);
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const userDoc = user as IUserDocument;
    const isPasswordValid = userDoc.isPasswordCorrect ? await userDoc.isPasswordCorrect(currentPassword) : false;
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid password")
    }
    userDoc.password = newPassword;
    await userDoc.save({validateBeforeSave : false});
    return res.status(200)
        .json(new ApiResponse(200, "Password Changed Succesfully", undefined));

})
const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,(req as AuthenticatedRequest).user,"Current User Fetched Successfully"))
})
const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName,email} = req.body
    
    if(!fullName && !email){
        throw new ApiError(400,"All fields are required")
    }
    const user =await User.findByIdAndUpdate(
    (req as AuthenticatedRequest).user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new : true}
    ).select("-password")
    return res.status(200)
        .json(new ApiResponse(200, "Account details updated successfully", user || undefined));

})
const updateUserAvatar = asyncHandler(async(req,res)=>{
    // take the new picture from req.file
    //validation
    // change in user
    // update it 
    // Skipping Cloudinary avatar upload, just update avatar with provided path or default
    const avatarLocalPath = (req as AuthenticatedRequest).file?.path || "";
    const user = await User.findByIdAndUpdate((req as AuthenticatedRequest).user._id,
        {
            $set:{
                avatar: avatarLocalPath
            }
        },
        {new : true}
    ).select("-password");
    return res.status(200)
        .json(new ApiResponse(200, "Avatar updated successfully", user || undefined));
})
const updateUserCoverImage = asyncHandler(async(req,res)=>{
    // take the new picture from req.file
    //validation
    // change in user
    // update it 
    // Skipping Cloudinary cover image upload, just update coverImage with provided path or default
    const coverImageLocalPath = (req as AuthenticatedRequest).file?.path || "";
    const user = await User.findByIdAndUpdate((req as AuthenticatedRequest).user._id,
        {
            $set:{
                coverImage: coverImageLocalPath
            }
        },
        {new : true}
    ).select("-password");
    return res.status(200)
        .json(new ApiResponse(200, "CoverImage updated successfully", user || undefined));
})
const getUserChannelProfile = asyncHandler(async(req,res)=>{
    const {username} = req.params
    if(!username?.trim()){
        throw new ApiError(400,"Please provide username")
    }
    const channel = await User.aggregate([
        {
            $match:{
                username : username?.toLowerCase()
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "_id",
                foreignField : "channel",
                as : "subscribers"
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "_id",
                foreignField : "subscriber",
                as : "subscribedTo"
            }
        },
        {
            $addFields : {
                subscribersCount : {
                    $size : "$subscribers" // count the subscribers
                },
                subscribedToCount : {
                    $size : "$subscribedTo" // count the subscribedTo
                },
                isSubscribed : {
                    $cond : {
                        if : {$in : [(req as AuthenticatedRequest).user?._id,"$subscribers.subscriber"]},
                        then : true,
                        else : false
                    }
                }
            }
        },
        {
            $project : {    // 1 to send 0 to not send
                fullName : 1, 
                avatar : 1,
                coverImage : 1,
                username : 1,
                subscribersCount : 1,
                subscribedToCount : 1,
                isSubscribed : 1,
                email : 1
            }
        }
    ])
    if(!channel?.length){
        throw new ApiError(404,"Channel not found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,channel[0],"Channel profile fetched successfully")
    )
})
const getWatchHistory = asyncHandler(async(req,res)=>{
    const user = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId((req as AuthenticatedRequest).user._id)
            }
        },
        {
            $lookup : {
                from : "videos",
                localField : "watchHistory",
                foreignField : "_id",
                as : "watchHistory",
                pipeline: [
                    {
                        $lookup : {
                            from : "users",
                            localField : "owner",
                            foreignField : "_id",
                            as: "owner",
                            pipeline : [
                                {
                                    $project : {
                                        fullName : 1,
                                        username : 1,
                                        avatar : 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields : {
                            owner : {
                                $first : "$owner"
                            }
                        }
                    }
                ]
            },
            
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200,user[0].getWatchHistory,"Watch history fetched successfully"))
})
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
};