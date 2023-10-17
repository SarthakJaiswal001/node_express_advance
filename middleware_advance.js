const express=require('express');
const app=express();
//use vs route
//options - our own/express/third party middleware
//morgan npm is a third praty middleware which we can install using npm install morgan
//request sended by user => middleware => response given by server
const logger=require('./logger_middleware.js');
const authorize=require('./authorize.js');
//app.use('/api',logger);//now this logger will be used for all the routes that starts with /api
app.use([authorize,logger]);

app.get('/', (req,res)=>{
    res.send('home');
})
app.get('/about' , (req,res)=>{
    res.send('about');
})
app.get('/api/products',(req,res)=>{
    res.send('products')
})
app.get('/api/items',[logger,authorize],(req,res)=>{//if we want to add middleware to specific routes only then we can add it as a second parameter in the route
    console.log(req.user);
    res.send('items');
})
app.listen(5000,()=>{
    console.log('server listening on port 5000...');
})