const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app=express();
const ejs=require("ejs");
const User=require("./model/user");
const {signupRoute,loginRoute,getHomePage, getLoginPage}=require("./controller/routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(cookieParser());


app.get('/', getLoginPage);
app.post('/signup',signupRoute);
app.get("/home",getHomePage);
app.post('/login',loginRoute);


mongoose.connect("mongodb://localhost:27017/intern")
.then(()=>{
    console.log("connected to database")
    app.listen(3000,()=>{
        console.log(`Server running on port 3000`);
    });

})
.catch(()=>{
    console.log("connection failed")
});