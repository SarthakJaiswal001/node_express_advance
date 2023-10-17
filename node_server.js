const http=require('http');
const{readFileSync} =require('fs');
const homePage=readFileSync('./index.html');

const server=http.createServer((req,res)=>{
    const url=req.url;
if(url === '/'){
    res.writeHead(200,{'content-type':'text/html'});
    res.write(homePage);
    console.log('hello')
    res.end();
}
else{
    res.writeHead(404,{'content-type':'text/html'});
    res.write('<h1>page not found</h1>');
    res.end();
}

})

server.listen(5000);