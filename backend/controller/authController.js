const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require("../models/User");


const singUp = async (req, res) => {

    try {

        
        const { email, password, name } = req.body;

        //validating the result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ error: errors.array() })
        }

        //check wether the user with the email exist or not
        userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User with this email already exists" })
        }

        //hash password

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        const data = {
            user: {
                id: user._id,
            }
        }
        //setting up jwt token
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        return res.status(200).cookie('authToken', authToken).json({ msg: "User signed up successfully", user });

    } catch (error) {
        
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}


const logIn = async (req, res) => {

    try {

        
        const { email, password } = req.body;

        //validating the result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        //checking wether user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "Enter the correct cridentials" })
        }

        //check password is correct or not

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.json({ error: "Enter the correct cridentials" });
        }

        const data = {
            user: {
                id: user._id,
            }
        }
        //setting up jwt token
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        return res.status(200).cookie('authToken', authToken).json({ msg: "User logged in successfully", user });

    } catch (error) {
        
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const logOut = async (req, res) => {
    try {

        const authToken = "";
        return res.status(200).cookie('authToken', authToken).json({ msg: "User was logged out" });
    } catch (error) {
        
        return res.status(500).json({
            error: "Internal server error"
        })

    }
}

module.exports = { singUp, logIn, logOut }

