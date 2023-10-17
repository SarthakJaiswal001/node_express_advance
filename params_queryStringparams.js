const express=require('express');
const app = express();
const {products, people}=require('./data.js');

app.get('/', (req,res)=>{
    res.send('<h1> Hello </h1><a href="/api/products">products</a>');
})
app.get('/api/products',(req,res)=>{
    res.json(products);
})
app.get('/api/products/:productID',(req,res)=>{//this will show only the product with id 1
    //now we will use params to get id because we cannot create route for every product if we have 1000 products
    // const newproduct=products.map((product)=>{
    //     const {id,name,image}=product;
    //     return {id,name,image};
    // })
    console.log(req.params);
    const {productID}=req.params;//prudctID is the name of the variable we are using to get the id
    const singleproduct=products.find((product)=>product.id===Number(productID));//we get the params productID as string so we need to convert it to number
    if(!singleproduct){
        res.status(400).send('product does not exist');
    }
    res.json(singleproduct);
})
app.get('/api/v1/query',(req,res)=>{
    //console.log(req.query);
    //localhost:5000/api/v1/quuery?search=a&limit=2 is the url we are using
    const {search,limit}=req.query;
    let sortedproducts=[...products];//here we are storing the copy of the products array
    if(search){
        sortedproducts=sortedproducts.filter((product)=>{
            return product.name.startsWith(search);//searching for the product name that starts with the search string
        })
    }
    if(limit){
        sortedproducts=sortedproducts.slice(0,Number(limit));
    }
    if(sortedproducts.length<1){
        return res.send('product not found');//we have to write return because if we dont write return then the code will continue to run and it will give error, one route cannot have two responses
    }
    res.send(sortedproducts);
})
app.listen(5000,()=>{
    console.log('server listening on port 5000...');
})

//query string params or url params are used to send extra information to the server