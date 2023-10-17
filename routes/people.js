const express=require('express');
const route=express.Router();//invoking the router method

const {people}=require('../data.js');
const {
    getPeople,
    createPerson,
    changePerson,
    deletePerson}
    =require('../controllers/peoplefunctions.js');//we have to destructure the functions from the peoplefunctions.js file




route.get('/',getPeople)
//route.route('/').get(getPeople).post(createPerson)//this is another way of writing the above code but we have to write the code in the same line
//it depends on person choice which way he wants to write the code
route.post('/',createPerson)


route.put('/:id',changePerson)


route.delete('/:id',deletePerson)

module.exports=route;//exporting the router method
