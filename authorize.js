const authorize=(req,res,next)=>{//this is a middleware
    const {user}=req.query;//we are getting the user from the query string
    if(user==='john'){
        req.user={name:'john',id:3};
        next();
    }
    else{
        res.status(401).send('user not found');
    }
}
module.exports=authorize;