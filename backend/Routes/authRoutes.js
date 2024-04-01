const express=require('express');
const Router=express.Router();
const {body}=require('express-validator');
const { singUp, logIn, logOut } = require('../controller/authController');
const fetchUser=require('../middleware/fetchUser')
Router.post('/signup',[
    body('name','Name can not be empty').trim().notEmpty(),
    body('email','Enter a valid email ').trim().isEmail().notEmpty(),
    body('password','Password can not be empty').trim().notEmpty()
],singUp)


Router.post('/login',[
    body('email','Enter a valid email').trim().notEmpty(),
    body('password','Password can not be empty').trim().notEmpty()
],logIn)

Router.get('/logout',fetchUser,logOut)

module.exports=Router;