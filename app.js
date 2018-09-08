const express=require('express');
const app=express();
const SQL = require('./shared/sqlmodule');
queries=require('./shared/queries');
//node app.js

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("NodeBiz v0.0.0")
  
});

app.get('/',(req,res)=>{
    res.send('Hola Biz');
  });
  app.get('/cont/cuentas',(req,res)=>{
    console.log(req.query)
    const plan=req.query.plan
    const ta=req.query.ta
    var qry,criteria,where;
    if (plan=="auxi"){
      qry=queries.auxiliares;
      where=  "where tipo='"+ta+"'"    
    }
    if (plan=="cuenta"){
      qry=queries.cuentas;  
      where=  "where auxiliar='"+ta+"'"    
    }
      qry=qry.replace(/#where#/i, where);
      criteria={qry:qry}
       console.log(criteria)
      SQL.sqlrequest(criteria, function (err, results) { 
         res.send(results);
      })
  });
  app.get('/cont/insert',(req,res)=>{
    const criteria={qry:queries.insert}
    console.log(criteria)
      SQL.sqlrequest(criteria, function (err, results) { 
         res.send(results);
      })
  });
  
  app.get('/cont/comprobante',(req,res)=>{
    const criteria={qry:queries.comprobante }
    //console.log(criteria)
    SQL.sqlexecute(criteria, function (err, results) { 
         res.send(results);
    })
  });
  app.get('/cont/balgen',(req,res)=>{
      //const row=comprobante.find(c=>c.id===parseInt(req.params.id));
      //if (!row) res.status(404).send('malo malo');

    //res.send(row);
    //const criteria={id:"ppa"}
  const criteria={qry:queries.balgen }
    SQL.sqlexecute(criteria, function (err, results) { 
     // console.log(results) 
         res.send(results);
     })
  });
  //app.listen(process.env.PORT || 3000); 

  //  app.listen(process.env.PORT || 4730); 
const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));
  
