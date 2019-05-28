'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("../controllers/MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
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
