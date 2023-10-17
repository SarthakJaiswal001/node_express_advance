const express=require('express');
const path=require('path');
const app=express();

//setup static and middleware
//if we simply want to create static website using html,css,js we can use this method
app.use(express.static('./public'));//this will load all the static files in public folder
//we can make as many middleware as we want
//middleware will run for every request
//middleware will run in sequence
//we will be using express mainly for api or templates for server side rendering
// app.get('/',(req,res)=>{
// res.status(200).sendFile(path.join(__dirname,'./index.html'));
// })
//for apis the content type is application/json
app.get('/about',(req,res)=>{
res.send('this is about page');
})

app.all('*',(req,res)=>{ //this will work for all the routes or pages if page not found it will show 404 error
res.status(400).send('<h1>Page not found</h1>');
})

app.listen(5000,()=>{
    console.log('server listening to port 5000');
})