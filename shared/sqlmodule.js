var sqlmodule = {
   
    sqlexecute: function (criteria, callback) {
        console.log(criteria)
        const qry=criteria.qry;
        const sql = require("mssql");
        // Configuration object for your database
        const config = {
            user: 'admin',
            password: 'pag9539961$',
            server: '206.72.117.220', 
            database: 'fuentes2015'
        };
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
                   callback(error);
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
