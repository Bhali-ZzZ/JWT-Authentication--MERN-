import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'

const register = async (req,res)=>{
    

    try {

        const {name , email , password , number , location} = req.body
        const image = req.file
        const imageUpload = await cloudinary.uploader.upload(image.path,{resource_type:"image"})

        const isExist = await userModel.findOne({email})
        if(isExist){
            return res.json({success:false , message:"User already exist!"})
        }

        if(!name || !email || !password || !image || !number || !location){
            return res.json({success:false , message:"Information missing!"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        

        const user = new userModel({
            name,
            email,
            password:hashedPassword,
            image:imageUpload.secure_url,
            number,
            location
        })

        await user.save()

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '7d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
 
        return res.json({success:true , message:"User registered successfully!"})
        
    } catch (error) {
        return res.json({success:false , message:error.message})
    }

}

const login = async (req,res)=>{

    const {email , password} = req.body

    try {
        const isExist = await userModel.findOne({email})
        
        if(!isExist){
            return res.json({success:false , message:"User doesn't exist!"})
        }

        const isMatch = await bcrypt.compare(password , isExist.password)

        if(!isMatch){
            return res.json({success:false , message:"Credentials are incorrect!"})
        }

        const token = jwt.sign({id:isExist._id} , process.env.JWT_SECRET , {expiresIn : '7d'})

        res.cookie('token' , token , {
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success:true , message : "Successfully Logged in!"})


        
    } catch (error) {
        return res.json({success:false , message:error.message})
    }

}

const logout = async (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({success:true , message:"Logged out successfully!"})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }
}

export {register , login , logout}