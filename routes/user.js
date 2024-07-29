import express from 'express';
import User from '../models/user.js'
import jwt from "jsonwebtoken"
import { encrypt, decrypt } from '../middlewares/Encrypt_Decrypt.js';

const router = express.Router();

router.get("/api/v1/isAuthenticated", async (req,res) => {
    const { token } = req.cookies;
    console.log("yes")
    if (token) {
        const userId = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        const userData = await User.findById(userId)
        return res.status(200).json(
            {success: true, message: userData}
        )
    }else{
        return res.status(400).json({
            success: false,
            message: 'User is Not Authenticated'
        })
    }
})

router.post("/api/v1/login", async (req, res) => {
   const { email, password } = req.body;

    let user = await User.findOne({email})
    if(!user){  
    return res.status(400).json(
        {success: false, message:"User not exist, Please Signup"}
    )}
    else {
        if(password === user.password){
            const token = jwt.sign({_id: user._id}, `${process.env.JWT_TOKEN}`)
            
            // res.cookie("token", token, ({ httpOnly: true }) );
            res.cookie("token", token, { 
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                
                domain : null,
                cookie: true
            });
            
            console.log("signed in successfully");  
            return res.status(200).json({
                success: true,
            });
        } else if(password !== user.password) {
            return res.status(401).json(
               {success: false, message:"Invalid Password"}
            )
        }
      }
   });

router.post("/api/v1/register", async (req, res) => {
    const { name, email, password, referredBy } = req.body;
    let user = await User.findOne({ email });
    let refByUD;
    
    if (user) {
        console.log("User already exists");
        return res.status(400).json({ success: false, message: "User already exists" });
    } 
    else if (referredBy === null || referredBy === '' || referredBy === undefined){
        try {
            // let encryptedPassword = encrypt(password)
            // Assuming this is where you create the user
            user = await User.create({
                name,
                email,
                password,
                // password: encryptedPassword,
            });

            const encryptedHashedId = encrypt(`${user._id}`);
            user.refrringLink = `${process.env.HTTP_FRONT}/register?refrralCode=${encryptedHashedId}`;

            await user.save();

            res.status(201).json({ success: true, message: "Registration successful without referral" });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(401).json({ success: false, message: "Error whole creating user without referral" });
        }
    } 
    else {
        try {
            // let encryptedPassword = encrypt(password);
            const decryptedHashedId = decrypt(referredBy);
            refByUD = await User.findById(decryptedHashedId);
            try {
                // Assuming this is where you create the user
                user = await User.create({
                    name,
                    email,
                    password,
                    refrredBy: refByUD._id, 
                    // password: encryptedPassword,
                });

                const encryptedHashedId = encrypt(`${user._id}`);
                user.refrringLink = `${process.env.HTTP_FRONT}/register?refrralCode=${encryptedHashedId}`;
                
                refByUD.refrrals.push({Name: user.name});
                await refByUD.save();
                await user.save();

                res.status(201).json({ success: true, message: "Registration successful with referral" });
            } catch (error) {
                console.error("Error creating user:", error);
                return res.status(401).json({ success: false, message: "Error while creating user with referral" });
            }
            
        } catch (error) {
            return res.status(401).json({ success: false, message: "Please use valid referral or remove it" });
        }
    }
}) 

export default router;
