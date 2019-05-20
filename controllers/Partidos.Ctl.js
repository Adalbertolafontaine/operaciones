'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const MenuCtl_1 = __importDefault(require("../controllers/MenuCtl"));
let consulta = new ConsultaCtl_1.default();
class EleccionesClass {
    constructor() {
    }
    inicio(req, res) {
        let parametros = [];
        let Consulta = `SELECT [ID] ,[Descripcion]  FROM [dbPRM].[dbo].[Provincia]`;
        let datos = { menu: MenuCtl_1.default.menus('Partidos') };
        consulta.consulta(Consulta, parametros).then(data => {
            datos['provincias'] = data;
            res.render('partidos', {
                title: 'Partidos Politicos',
                datos: datos
            });
        });
    }
    newpartidos(req, res) {
        let datos = [];
        let valor = '';
        datos = req.body;
        if (!Array.isArray(datos)) {
            datos = [datos];
        }
        datos.forEach(element => {
            if (valor !== '') {
                valor += ',';
            }
            valor += `('${element['nombre']}', '${element['siglas']}')`;
        });
        let sql = `INSERT INTO [dbo].[Partidos] ([nombre]  ,[siglas])     VALUES  `;
        sql += valor;
    }
    getpartidos(req, res) {
        let partido = req.params.partido;
        let parametros = [];
        let sql = '';
        if (partido === 'listado') {
            sql = `SELECT  [nombre],[siglas] FROM [dbPRM].[dbo].[Partidos]`;
        }
        else {
            sql = `SELECT  [nombre],[siglas] FROM [dbPRM].[dbo].[Partidos] where siglas = @intVal `;
            parametros.push({ campo: 'intVal', tipo: 'NVarChar', valor: partido });
        }
        consulta.consulta(sql, parametros).then(element => {
            res.status(200).send({ partidos: element });
        });
    }
}
exports.default = EleccionesClass;
