const express=require('express');
const app=express();
const SQL = require('./shared/sqlmodule');
queries=require('./shared/queries');
//node app.js

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("NodeBiz v0.0.0")
  var ppa=queries.f();
  console.log(ppa)
});

app.get('/',(req,res)=>{
    res.send('Hola Biz');
  });
  app.get('/cont/cuentas',(req,res)=>{
    console.log("/cont/cuentas")
    const plan=req.query.plan
    const ta=req.query.ta
    var qry,criteria;
    criteria={plan,ta}
    if (plan=="ta"){
      qry=queries.qrytipoauxiliares(criteria)
    }
    if (plan=="cuenta"){
      qry=queries.qrycuentas(criteria)
    }
    if (plan=="auxi"){
      qry=queries.qryauxiliares(criteria)
   }
     const criteriaqry={qry:qry}
       console.log(criteriaqry)
      SQL.sqlrequest(criteriaqry, function (err, results) { 
         res.send(results);
      })
  });
  app.get('/cont/comprobante',(req,res)=>{
    qry=queries.comprobante;
    var where="where A.Num_Comprob = 'CIE201712999999' and A.Periodo = 201712 and A.Cia = '0000000'";
    qry=qry.replace(/#where#/i, where);
    const criteria={qry:qry}
    //console.log(criteria)
    SQL.sqlrequest(criteria, function (err, results) { 
         res.send(results);
    })
  });

  

  app.get('/cont/balgen',(req,res)=>{
      
    const criteria={qry:queries.balgen }
      SQL.sqlrequest(criteria, function (err, results) { 
       // console.log(results) 
           res.send(results);
       })
       //const row=comprobante.find(c=>c.id===parseInt(req.params.id));
        //if (!row) res.status(404).send('malo malo');
  
      //res.send(row);
      //const criteria={id:"ppa"}
    });
    app.get('/cont/mayana',(req,res)=>{
      
      const criteria={qry:queries.mayana }
        SQL.sqlrequest(criteria, function (err, results) { 
         // console.log(results) 
             res.send(results);
         })
         //const row=comprobante.find(c=>c.id===parseInt(req.params.id));
          //if (!row) res.status(404).send('malo malo');
    
        //res.send(row);
        //const criteria={id:"ppa"}
      });
  app.get('/cont/insert',(req,res)=>{
    const criteria={qry:queries.insert}
    console.log(criteria)
      SQL.sqlrequest(criteria, function (err, results) { 
         res.send(results);
      })
  });
const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));
  
