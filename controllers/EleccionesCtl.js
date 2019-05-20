'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("../controllers/MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const Extructura_class_1 = __importDefault(require("./Extructura.class"));
let consulta = new ConsultaCtl_1.default();
class EleccionesClass {
    constructor() {
    }
    inicio(req, res) {
        let parametros = [];
        let Consulta = `SELECT [ID] ,[Descripcion]  FROM [dbPRM].[dbo].[Provincia]`;
        let datos = { menu: MenuCtl_1.default.menus('Elecciones') };
        datos['provincias'] = Extructura_class_1.default.provincias;
        res.render('home', {
            title: 'Elecciones Anteriores',
            datos: datos
        });
    }
    getelecciones(req, res) {
        let categoria = req.params.categoria;
        let query = req.query;
        let estructura = Extructura_class_1.default.estructura;
        let campos = '';
        let nombre = '';
        let campoQuery = '';
        let parametro = [];
        switch (categoria) {
            case 'nacional':
                nombre = 'E.localidad';
                campoQuery = '';
                break;
            case 'provincial':
                nombre = 'P.Descripcion';
                campoQuery = `, [dbPRM].[dbo].Provincia P WHERE e.cod_prov = p.ID`;
                break;
            case 'municipio':
                nombre = 'desc_mun';
                campoQuery = `where cod_prov = @intVal`;
                parametro.push({ campo: 'intVal', tipo: 'Int', valor: query['prov'] });
                break;
            case 'recintos':
                nombre = 'C.Descripcion';
                campoQuery = `, [dbPRM].[dbo].Colegio C WHERE C.IDMunicipio = @intVal and C.IDColegio = e.IDColegio`;
                parametro.push({ campo: 'intVal', tipo: 'Int', valor: query['muni'] });
                break;
            default:
                break;
        }
        estructura.forEach(element => {
            if (campos !== '')
                campos += ',';
            campos += `sum(E.${element}) as ${element}`;
        });
        let sql = `SELECT E.periodo, count(E.Id) as colegios, ${nombre} as nombre, ${campos}  FROM [dbPRM].[dbo].[Elecciones] E ${campoQuery}  group by ${nombre}, E.periodo order by inscritos DESC;`;
        if (nombre !== '') {
            consulta.consulta(sql, parametro).then(datos => {
                return res.status(200).send({ datos: datos });
            });
        }
        else {
            return res.status(200).send({ datos: [] });
        }
    }
    listado(req, res) {
        let query = req.query;
        let estructura = Extructura_class_1.default.estructura;
        let campos = '';
        estructura.forEach(element => {
            if (campos !== '')
                campos += ',';
            campos += `[${element}] [int] NULL`;
        });
        return res.status(200).send(campos);
    }
}
exports.default = EleccionesClass;
