const express = require('express');
const route= express.Router();
const {people}=require('../data.js');

route.post('/',(req,res)=>{
    //here / means /login because we have used app.use('/login',auth) in script.js
    //content type for this request is application/urlencoded
    console.log(req.body);
    const {name}=req.body;
    if(name){
       return res.send(`welcome ${name}`);
    }
    res.send('post request');
})

module.exports=route;
