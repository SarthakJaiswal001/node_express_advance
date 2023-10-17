const express=require('express');
const app=express();

const  people  = require('./routes/people.js');
const auth=require('./routes/auth.js');

app.use(express.static('./methods-public'))
//in order to get the data from the form we have to use middleware called urlencoded which is a builtin middleware in express
 app.use(express.urlencoded({extended:false}))//accessing form data in post request , this is gonna parse the data provided by form and add it to the body property of the request object
//urlencoded is a method in express which is used to parse the form data and add it to the body property of the request object
app.use(express.json())//accessing json data in post request 
app.use('/api/people', people)//this middleware simply means that if the url starts with /api/people then use the people router
app.use('/login', auth);



// app.post('/login',(req,res)=>{
//     //content type for this request is application/urlencoded
//     console.log(req.body);
//     const {name}=req.body;
//     if(name){
//        return res.send(`welcome ${name}`);
//     }
//     res.send('post request');
// })


app.listen(5000, ()=>{
    console.log('server listening to port 5000')
})

//request object
//request object is an object that contains all the information about the request that is made to the server
//request payload is the data that is sent to the server
//request body is the data that is sent to the server
//request header is the information about the request that is sent to the server
//request method is the method that is used to make the request, it can be get,post,put,delete
//request url is the url that is used to make the request
//request query is the query string that is sent to the server, example: ?name=shubham&age=20
//params is the parameters that are sent to the server, example: /api/people/:id, here id is the parameter
//query string is the part of the url that is used to send the data to the server, example: /api/people?name=shubham&age=20
//mvc is a software design pattern that is used to develop user interfaces and it divides the application into 3 interconnected parts, model, view and controller and it is used to separate the internal representation of information from the way that information is presented to the user and accepted from the user
//controllers are the functions that are used to send the response to the client and they are used to handle the requests
//refactoring the code means changing the code without changing the functionality of the code and it is done to make the code more readable and maintainable