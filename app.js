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
  app.post('/cont/comprobante',(req,res)=>{
    res.send('get comprobante');
  });
  
  app.get('/cont/comprobante',(req,res)=>{
    const criteria={qry:"select top 1000 * from cont_diario" }
    SQL.sqlexecute(criteria, function (err, results) { 
         res.send(results);
    })
  });
  app.get('/cont/balgen',(req,res)=>{
      //const row=comprobante.find(c=>c.id===parseInt(req.params.id));
      //if (!row) res.status(404).send('malo malo');

    //res.send(row);
    //const criteria={id:"ppa"}
  const criteria={qry:"MM_CONT_BAL 'INAZZ20',201808,201808 ,0,0,'1442',11,1,4,0,0,0,'0'" }
  SQL.sqlexecute(criteria, function (err, results) { 
     // console.log(results) 
  res.send(results);
  })
  });
  //app.listen(process.env.PORT || 3000); 

  //  app.listen(process.env.PORT || 4730); 
const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));
  
