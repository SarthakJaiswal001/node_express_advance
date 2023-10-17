const logger= (req , res, next)=>{//this is middleware
    const url=req.url;
    const method=req.method;
    const date= new Date().getDate();
    console.log(url, method, date);
    next();//this is used to move to the next middleware or function
    }
    module.exports=logger;