'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("../controllers/MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const fs_1 = __importDefault(require("fs"));
let consulta = new ConsultaCtl_1.default();
class GeneralCtl {
    constructor() {
    }
    inicio(req, res) {
        let datos = { menu: MenuCtl_1.default.menus('home') };
        let divisiones = ['C', 'E', 'NE', 'N', 'SDO', 'S', 'SC'];
        datos['divisiones'] = divisiones;
        res.render('home', {
            title: 'Operativos',
            datos: datos
        });
    }
    division(req, res) {
        let divisiones = [];
        let salida = [];
        let titulos = [];
        let d = [];
        let erro = [];
        let rango = 1000;
        var campos = ['nombre', 'estatus', 'sueldo', 'institucion'];
        fs_1.default.readFile('./data/dicom.csv', 'utf-8', (err, data) => {
            if (err) {
                console.log('error: ', err);
            }
            else {
                data = data.toString();
                data = data.toLowerCase();
                d = data.split('\r\n');
                for (let i = 0; i < d.length; i++) {
                    let temp = d[i].split(';');
                    if (i === 0) {
                        titulos = temp;
                        let l = (titulos[0] === ` ${campos[0].length}`);
                        console.log(l);
                    }
                    else {
                        if (temp[0] === '' && temp.length === 1) {
                        }
                        else {
                            let t = {};
                            if (titulos.length !== temp.length) {
                                erro.push({ temp, i });
                            }
                            else {
                                for (let j = 0; j < titulos.length; j++) {
                                    t[titulos[j]] = (titulos[j] === 'sueldo') ? parseInt(temp[j]) : temp[j];
                                }
                                divisiones.push(t);
                            }
                        }
                    }
                }
                if (erro.length > 0) {
                    return res.send({ erro }).status(200);
                }
                else {
                    envio();
                }
            }
        });
        function envio() {
            let sql = '';
            let distancia = (divisiones.length < rango) ? divisiones.length : rango;
            for (let i = 0; i < distancia; i++) {
                if (sql !== '')
                    sql += ',';
                let temp = '';
                campos.forEach(element => {
                    if (temp !== '')
                        temp += ',';
                    temp += `'${divisiones[0][element]}'`;
                });
                sql += `(${temp})`;
                divisiones.shift();
            }
            let i = `INSERT INTO [dbo].[Empleados] (${campos.toString()}) VALUES ${sql}`;
            if (divisiones.length === 0) {
                return res.send(i).status(200);
            }
            else {
                envio();
            }
        }
    }
    categorias(req, res) {
        let categorias = req.params.categoria;
        let valor = (!isNaN(req.query.id) ? req.query.id : '');
        let tabla = '';
        let parametros = [];
        let consultas = '';
        let campo = '';
        let nombre = '';
        switch (categorias) {
            case 'divisiones':
                nombre = 'desc_division';
                tabla = categorias;
                break;
            case 'inspectoria':
                nombre = 'desc_inspectoria';
                tabla = categorias;
                consultas = `division = ${valor}`;
                break;
            case 'secciones':
                nombre = 'desc_seccion';
                tabla = categorias;
                consultas = `inspectoria = ${valor}`;
                break;
            case 'provincias':
                nombre = 'desc_provincia';
                tabla = categorias;
                break;
            case 'municipios':
                nombre = 'desc_municipio';
                tabla = categorias;
                consultas = `enlace like '${valor}%'`;
                break;
            case 'barrios':
                nombre = 'desc_barrio';
                tabla = categorias;
                consultas = `enlace like '${valor}%'`;
                campo = '[longitud],[latitud],';
                break;
            case 'actividades':
                nombre = 'desc_actividad';
                tabla = categorias;
                break;
            default:
                return res.status(200).send([]);
        }
        if (consultas !== '')
            consultas = `where ${consultas}`;
        campo += (consultas.lastIndexOf('enlace') > -1 || categorias === 'provincias') ? 'enlace' : 'id';
        let sql = `SELECT  ${campo} as id, ${nombre} as [nombre]  FROM ${tabla} ${consultas} order by nombre`;
        consulta.consulta(sql, parametros).then(element => {
            res.send(element).status(200);
        });
    }
    provincias(req, res) {
        let sql = 'SELECT  [id],[nombre]  FROM [Operaciones].[dbo].[Provincias] ';
        consulta.consulta(sql, []).then(element => {
            res.send(element).status(200);
        });
    }
}
exports.default = GeneralCtl;
