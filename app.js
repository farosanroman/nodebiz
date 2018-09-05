const http=require(http)
const server=http.createServer((req,res)=>{
   if (req.url==='/'){
    response.type('text/plain');
    var text = 'nodebiz:'
    response.send(text);

   }


})

server.listen(3000);