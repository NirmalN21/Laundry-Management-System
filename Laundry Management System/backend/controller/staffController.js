import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";
import verifyToken from "../auth.js";
import cloudinary from "../cloudinary.js";
import Staff from "../models/staffSchema.js";
import User from "../models/userSchema.js";

dotenv.config({ path: "./config.env" });

const staffRoutes = Router();

staffRoutes.use(cookieParser());

export const staffHome = async function (req, res) {

    try {

        const token = req.cookies.jwtoken;

        const result = await verifyToken(token);

        if (result.success) {
            console.log("Authorization successfull");
            return res.status(200).json({ Message: "User is Authorized" });
        } else {
            throw new Error("User Not Found")
        }

    } catch (err) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(err);
    }
}

export const staffRegister = async function (req, res) {

    let { name, email, phone, userId, password, cpassword } = req.body;

    try {
        const findUser = await Staff.findOne({ email: email });

        if (findUser) {
            return res.status(409).json({ error: "User already exists!!!" });
        } else if (password != cpassword) {

            return res.status(409).json({ error: "Passwords not Matched" });
        } else {

            const hash = await bcrypt.hash(password, 12);

            const staff = new Staff({ role: "staff", userId, name, email, phone, password: hash });

            await staff.save();

            console.log("User Saved Successfully");
            res.send("User Saved Successfully");

        }

    } catch (err) {
        console.log(err);
    }

}

export const staffLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the required fields!!!" });
        }
        const findUser = await Staff.findOne({ email: email });

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {

            const isMatch = await bcrypt.compare(password, findUser.password);

            if (isMatch) {

                // Generating token using jsonwebtoken
                let token = jsonwebtoken.sign({ _id: findUser._id }, process.env.SECRET_KEY);
                findUser.tokens = findUser.tokens.concat({ token: token });

                // Creating cookie using the generated token
                res.cookie("jwtoken", token, {
                    expiresIn: new Date(Date.now + 86400000),
                    httpOnly: false
                });

                await findUser.save();
                console.log("User Login Successfull!!!");
                return res.json({ message: "User Login Successfull!!!" });

            } else {
                return res.status(401).json({ error: "Invalid Credentials!!! pass" });
            }
        }
    } catch (err) {
        console.log(err);
    }

}


export const staffGetData = async function (req, res) {

    try {
        const token = req.cookies.jwtoken;

        const result = await verifyToken(token);

        if (result.success) {
            console.log("Authorization successfull");
            res.send(result.user);
        } else {
            throw new Error("User Not Found")
        }

    } catch (err) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(err);
    }

}

export const staffGetDataUser = async (req, res) => {

    console.log("staffR");
    try {
        const staffUserId = req.params.staffUserId;

        // Find users with the same userId as the staff member
        const users = await User.find({ userId: staffUserId });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found for the specified staff member.' });
        }

        // Return the list of users
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const staffUpdateProfile = async (req, res) => {

    try {

        const token = req.body.cookieValue;

        const result = await verifyToken(token);

        if (result.success) {

            const fileString = req.body.data;

            const uploadedResponse = await cloudinary.uploader.
                upload(fileString, {
                    upload_preset: "i91jqvyx",

                }).then(async (uploadedImg) => {
                    console.log("Image Saved Successfully");
                    console.log(uploadedImg.secure_url);

                    const rootUser = result.user;
                    const userContact = await User.findOne({ _id: rootUser._id });

                    if (userContact) {

                        await User.findOneAndUpdate({ _id: rootUser._id }, { image: uploadedImg.secure_url });

                        res.status(201).json({ message: "Image Added Successfully" });
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            throw new Error("User Not Found")
        }

    } catch (error) {
        console.log(error);
    }

}