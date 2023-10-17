const express=require('express');
const app=express();
const {people}=require('./data.js');
app.use(express.static('./methods-public'))
//in order to get the data from the form we have to use middleware called urlencoded which is a builtin middleware in express
 app.use(express.urlencoded({extended:false}))//accessing form data in post request , this is gonna parse the data provided by form and add it to the body property of the request object
//urlencoded is a method in express which is used to parse the form data and add it to the body property of the request object
app.use(express.json())//accessing json data in post request 
app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true,data:people});
})
app.post('/api/people',(req,res)=>{//this is gonna add the data to the people array
    const {name}=req.body;
    if(!name){
    return res.status(400).send('please provide name value');
    }
    res.status(201).json({success:true,person:name});//the frontend will send the data in json format and we will send the response in json format

})
app.post('/login',(req,res)=>{
    //content type for this request is application/urlencoded
    console.log(req.body);
    const {name}=req.body;
    if(name){
       return res.send(`welcome ${name}`);
    }
    res.send('post request');
})
app.put('/api/people/:id',(req,res)=>{
    const {id}=req.params;//if we will have 2 params in the url then we will have to write {id,name} and then we will have to use id and name in the code, here we have only one param so we have to write {id} and then we will have to use id in the code
    const {name}=req.body;
    const person = people.find((person)=> {return person.id===Number(id)}//we have to convert id to number because id is string and person.id is number
    )
    if(!person){//ifperson is not found
        return res.status(404).json({success:false,msg:`no person with id ${id}`});
    }
    const newperson = people.map((person)=>{//if person is found then we have to update the name of the person
        if(person.id === Number(id)){
            person.name=name;
        }
        return person;
    })
    res.status(200).json({success:true,data:newperson})//we have to send the updated data
    // console.log(id, name);
    // res.send('put request');
})
app.delete('/api/people/:id',(req,res)=>{
    const person=people.find((person)=>{//we have to find the person with the id that is provided in the url
        return person.id===Number(req.params.id)
    })
    if(!person){//if person is not found then we have to send the response with status code 404
        return res.status(404).send(`no person with id ${req.params.id}`);
    }
    const newpeople=people.filter((person)=>{
        return person.id!==Number(req.params.id)//we have to filter out the person with the id that is provided in the url and then we have to send the response with the newpeople array that is created after filtering out the person with the id that is provided in the url
    })
    return res.status(200).json({success:true,data:newpeople});
})


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