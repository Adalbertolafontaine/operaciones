var Connection = require('tedious').Connection;
var config = {
    authentication: {
        type: 'default',
        options: {
            userName: 'mapeo',
            password: 'Alterno1997',
        }
    },
    options: {
        instanceName: 'MSSQLSERVER01',
        encrypt: true
    },
    server: '207.180.232.122',
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err)
        return console.log('err');
    console.log("Connected");
});
var Respuesta = require('tedious').Request;
var TYPES = require('tedious').TYPES;
function executeStatement() {
    let request = new Respuesta(" SELECT Codigo, CodigoRecinto  FROM [dbPRM].[dbo].[Recinto]  where id <5  order by CodigoRecinto", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    request.on('row', function (columns) {
        console.dir(columns);
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            }
            else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}
