const express=require('express');
const app=express();
const SQL = require('./shared/sqlmodule');
queries=require('./shared/queries');
//node app.js   <<<<<<<<<

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("NodeBiz v0.0.0")
  //var ppa=queries.f();
  console.log(ppa)
});

  app.get('/',(req,res)=>{
    res.send('Hola Biz');
  });
  app.get('/autenticacion',(req,res)=>{
    const criteria={login:"fuentes",pwd:"fuentes"}
    qry=queries.qryautenticacion(criteria)
    const criteriaqry={qry:qry}
    SQL.sqlrequest(criteriaqry, function (err, results) { 
     
     var aut=[{"orgid":72,"orgname":"FUENTES2015","UserId":3083,"UserLogin":"fuentes","UserPassword":"fuentes","useriddb":1,"orgdsn":"server=206.72.117.220;driver={sql server};uid=fuentes2015log;pwd=fuentes2015pwd123$;database=fuentes2015;"}]
     var dsn=aut[0].orgdsn;
     
     dsn=dsn.split(';')
     console.log("dsn") 
     console.log(results)
     console.log(dsn) 
     var server= dsn[0].replace("server=","");
     var uid= dsn[2].replace("uid=","");
     var pwd= dsn[3].replace("pwd=","");
     var db=dsn[4].replace("database=","");     
     var user={userid:results[0].UserId,username:results[0].UserName,userlogin:results[0].UserLogin,userpwd:results[0].UserPassword,usermail:results[0].UserEmail, orgid:results[0].orgid,orgname:results[0].orgname,server:server,uid:uid,pwd:pwd,db:db}
     console.log(user)
     res.send(user);
     // trama.Append(user.Id + ",");
     //               trama.Append(user.Login + ",");
     //               trama.Append(user.OrgId + ",");
     //               trama.Append(user.IdMember + ",");
     //               trama.Append(user.DBConn + ",");
     //               trama.Append(user.OrgName + ",");
     //               trama.Append(user.OrgUrl + ",");*/
    })
    
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
  
