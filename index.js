const express=require('express');
const app=express();
const SQL = require('./shared/sqlmodule');
//node index.js

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("NodeBiz v0.0.0")
  
});

app.get('/',(req,res)=>{
    res.send('Hola Biz');
  });
  app.get('/cont/comprobante',(req,res)=>{
    res.send('get comprobante');
  });
  
  app.post('/cont/comprobante',(req,res)=>{
    res.send('post comprobante');
  });
  app.get('/cont/balance',(req,res)=>{
      //const row=comprobante.find(c=>c.id===parseInt(req.params.id));
      //if (!row) res.status(404).send('malo malo');

    //res.send(row);
    //const criteria={id:"ppa"}
  const criteria={id:234}
  SQL.sqlexecute(criteria, function (err, results) { 
     // console.log(results) 
  res.send(results);
  })
  });
  const port=process.env.PORT || 3000
app.listen(3000,()=>console.log(`Listening on Port ${port}...`));
  
