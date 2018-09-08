const config = {
    user: 'admin',
    password: 'pag9539961$',
    server: '206.72.117.220', 
    database: 'fuentes2015'
};
var sqlmodule = {
    
    sqlrequest: function (criteria, callback) {
         
        const qry=criteria.qry;
        const sql = require("mssql");
        // Configuration object for your database
        
        sql.connect(config).then(function() {
            var request = new sql.Request();
            request.query(qry).then(function(recordset) {
              console.log('Recordset: ' + recordset);
              console.log('Affected: ' + request.rowsAffected);
              var callb={"Recordset":recordset,"Affected":request.rowsAffected}
              callback(null,recordset.recordsets[0]);
              sql.close()
            }).catch(function(err) {
                callback(null,{error:'Request error: ' + err});
                console.log('Request error: ' + err);
                sql.close()
            });
          }).catch(function(err) {
            if (err) {
                callback(null,{error:'SQL Connection Error: ' + err});
                console.log('SQL Connection Error: ' + err);
                sql.close()
            }
          });


    },
    sqlinsert: function (criteria, callback) {
         
        const qry=criteria.qry;
        const sql = require("mssql");
        // Configuration object for your database
        
        sql.connect(config).then(function() {
            var request = new sql.Request();
            request.query(qry).then(function(recordset) {
              console.log('Recordset: ' + recordset);
              console.log('Affected: ' + request.rowsAffected);
              var callb={"Recordset":recordset,"Affected":request.rowsAffected}
              callback(null,callb);
              sql.close()
            }).catch(function(err) {
                callback(null,{error:'Request error: ' + err});
                console.log('Request error: ' + err);
                sql.close()
            });
          }).catch(function(err) {
            if (err) {
                callback(null,{error:'SQL Connection Error: ' + err});
                console.log('SQL Connection Error: ' + err);
                sql.close()
            }
          });


    },
    sqlexecute: function (criteria, callback) {
        console.log(criteria)
        const qry=criteria.qry;
        const sql = require("mssql");
        // Configuration object for your database
        
        // connect to the database
        
        sql.connect(config, function (err) {
           if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
           // query to the database and get the records
           //const qry="MM_CONT_BAL 'INAZZ20',201808,201808 ,0,0,'1442',11,1,4,0,0,0,'0' ";
           //const qry="select top 1000 * from cont_diario"
            request.query(qry, function (err, recordset) {
                console.log(recordset)
              if (err) {
                   callback(null,err);
                   sql.close()
                }
                else{
               // send records as a response
                //res.send(recordset);
                  callback(null,recordset.recordsets[0]);
                sql.close()
                }
            });
        });
    }

}
module.exports =sqlmodule;
