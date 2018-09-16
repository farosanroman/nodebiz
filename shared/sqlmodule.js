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
    /*
StringBuilder trama = new StringBuilder();

                    trama.Append(user.Id + ",");
                    trama.Append(user.Login + ",");
                    trama.Append(user.OrgId + ",");
                    trama.Append(user.IdMember + ",");
                    trama.Append(user.DBConn + ",");
                    trama.Append(user.OrgName + ",");
                    trama.Append(user.OrgUrl + ",");*/
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
    

}
module.exports =sqlmodule;
