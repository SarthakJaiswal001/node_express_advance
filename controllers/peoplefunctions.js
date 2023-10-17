const people=require('../data.js');
//controller folder is used to store the functions that are used to handle the requests and send the response to the client
const getPeople=(req,res)=>{//here we have to write /api/people because we have used app.use('/api/people',route) in script.js and we have to write / because we have used app.use('/api/people',route) in script.js
    // which means / will act as /api/people
    res.status(200).json({success:true,data:people});
}
const createPerson=(req,res)=>{//this is gonna add the data to the people array
    const {name}=req.body;
    if(!name){
    return res.status(400).send('please provide name value');
    }
    res.status(201).json({success:true,person:name});//the frontend will send the data in json format and we will send the response in json format

}

const changePerson=(req,res)=>{
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
}
const deletePerson=(req,res)=>{
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
}

module.exports={
    getPeople,
    createPerson,
    changePerson,
    deletePerson
}