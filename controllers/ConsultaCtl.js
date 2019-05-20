'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const Connection = require('tedious').Connection;
const Respuesta = require('tedious').Request;
const TYPES = require('tedious').TYPES;
class ConsultaClass {
    constructor() {
    }
    consulta(query, parametros) {
        return new Promise((resol, rejec) => {
            let conecion = new Connection(config_1.default.sql);
            try {
                conecion.on('connect', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    let datos = [];
                    let request = new Respuesta(query, (err, rowCount, rows) => {
                        if (err) {
                            resol([]);
                        }
                        else {
                            conecion.close();
                            resol(datos);
                        }
                    });
                    var result = "";
                    parametros.forEach(element => {
                        if (element.tipo === 'intVal')
                            parseInt(element.valor);
                        request.addParameter(element.campo, TYPES[element.tipo], element.valor);
                    });
                    request.on('row', function (columns) {
                        let temp = {};
                        let nombre;
                        columns.forEach(element => {
                            nombre = element['metadata']['colName'].toLowerCase();
                            if (typeof element['value'] === 'string') {
                                temp[nombre] = (element['value'].toLowerCase()).trim();
                            }
                            else {
                                temp[nombre] = element['value'];
                            }
                        });
                        datos.push(temp);
                    });
                    request.on('done', function (rowCount, more) {
                        console.log(rowCount + ' rows returned');
                    });
                    conecion.execSql(request);
                });
            }
            catch (error) {
                console.log(error);
                resol([]);
            }
        });
    }
}
exports.default = ConsultaClass;
