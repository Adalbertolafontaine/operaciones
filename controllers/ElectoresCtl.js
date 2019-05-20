'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const MenuCtl_1 = __importDefault(require("./MenuCtl"));
let consulta = new ConsultaCtl_1.default();
class ElectoresClass {
    constructor() {
    }
    inicio(req, res) {
        let datos = { menu: MenuCtl_1.default.menus('Electores') };
        res.render('electores', {
            title: 'Electores',
            datos: datos
        });
    }
    getelectores(req, res) {
        let datos = req.body;
        let titulos = ['cedula', "Nombres", "Apellido1", "Apellido2", "IDColegio", 'fecha', 'edad', 'activo'];
        let campoQuery = '';
        let parametros = [];
        let foto = '';
        titulos.forEach(element => {
            if (datos[element] === '' || datos[element] === '0') {
            }
            else {
                if (campoQuery !== '')
                    campoQuery += ' and ';
                switch (element) {
                    case 'edad':
                        let fecha = new Date();
                        let mes = fecha.getMonth() + 1;
                        let ano = fecha.getFullYear();
                        let dia = fecha.getDate();
                        campoQuery += `(cast(datediff(dd,FechaNacimiento,GETDATE()) / 365.25 as int)) = @${element}`;
                        break;
                    case 'Nombres':
                        campoQuery += ` ${element} LIKE '%' +@${element}+ '%' `;
                        break;
                    case 'fecha':
                        campoQuery += `CONVERT(VARCHAR(10),FechaNacimiento,  23) = @${element}`;
                        break;
                    case 'activo':
                        if (datos[element] === 'true') {
                            campoQuery += ` verificador is not null and ESTATUS IS NULL and Zona IS NOT NULL`;
                        }
                        else {
                        }
                        break;
                    default:
                        campoQuery += ` ${element} = @${element}`;
                        break;
                }
                parametros.push({ campo: element, tipo: 'NVarChar', valor: MenuCtl_1.default.dirrecionWeb(datos[element]) });
            }
        });
        console.log(campoQuery);
        let sql = `SELECT [Cedula]
       ,CONVERT(VARCHAR(10),FechaNacimiento,  111) as FechaNacimiento
       ,[IDSexo]
       ,[CodigoColegio]
       ,[DescripcionColegio]
       ,[DescripcionRecinto]
       ,[DescripcionProvincia]
       ,[DescripcionDistritoMunicipal]
       ,[Descripcion] as Categoria
       ,[ESTATUS]
       
       ,[Nacionalidad]
       ,[Ocupacion]
       ,CONCAT ( Nombres, ' ', Apellido1, ' ', Apellido2 ) as Nombre
   FROM [dbPRM].[dbo].[vwCedulados2]  where ${campoQuery} order by nombre,Apellido1,Apellido2`;
        if (campoQuery !== '') {
            consulta.consulta(sql, parametros).then(element => {
                return res.status(200).send(element);
            });
        }
        else {
            return res.status(200).send([]);
        }
    }
    getfoto(req, res) {
        let Cedula = req.params.cedula;
        if (Cedula > 100000006) {
            let sql = `SELECT [Imagen] FROM [dbPRM].[dbo].[fotos_PRM_JCE] where Cedula = @cedula`;
            let parametros = [{ campo: 'cedula', tipo: 'NVarChar', valor: Cedula }];
            consulta.consulta(sql, parametros).then(element => {
                let e;
                e = element;
                if (e.length > 0)
                    return res.status(200).send(element[0]['imagen']);
                return res.status(200).send('');
            });
        }
        else {
            return res.status(200).send('');
        }
    }
}
exports.default = ElectoresClass;
