'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("./MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const Extructura_class_1 = __importDefault(require("./Extructura.class"));
let consulta = new ConsultaCtl_1.default();
function rangoedad(datos) {
    return new Promise((resol, reject) => {
        let lugar = [];
        let elementos = [];
        let index = 0;
        datos.forEach(elemen => {
            let nombre = elemen['nombre'];
            index = lugar.indexOf(nombre);
            if (index === -1) {
                lugar.push(nombre);
                elementos.push({ nombre: nombre, hombres: 0, mujeres: 0, inscritos: 0, colegios: elemen['colegios'], periodo: 2020 });
            }
            index = lugar.indexOf(nombre);
            let sexo = '';
            let rango = elemen['rangoedad'];
            if (elemen['idsexo'] === "m") {
                sexo = 'hombres';
            }
            else {
                sexo = 'mujeres';
            }
            elementos[index][sexo] += elemen['cantidad'];
            elementos[index]['inscritos'] += elemen['cantidad'];
            let menores = `${sexo}%-%18 a 24`;
            let mayores = `${sexo}%-%> 60`;
            let rangog = `${sexo}%-%${(rango * 5)} a ${((rango + 1) * 5) - 1}`;
            if (!elementos[index][menores]) {
                elementos[index][menores] = 0;
            }
            if (rango < 5) {
                elementos[index][menores] += elemen['cantidad'];
            }
            else {
                if (rango > 11 && rango < 15) {
                    if (!elementos[index][mayores]) {
                        elementos[index][mayores] = 0;
                    }
                    elementos[index][mayores] += elemen['cantidad'];
                }
                else {
                    if (!elementos[index][rangog]) {
                        elementos[index][rangog] = 0;
                    }
                    elementos[index][rangog] += elemen['cantidad'];
                }
            }
        });
        resol(elementos);
    });
}
class ColegiosCtls {
    constructor() {
    }
    inicio(req, res) {
        let datos = { menu: MenuCtl_1.default.menus('home') };
        res.render('casos', {
            title: 'Operativos',
            datos: datos
        });
    }
    getelecciones(req, res) {
        let categoria = req.params.categoria;
        let query = req.query;
        let campos = '';
        let nombre = '';
        let campoQuery = '';
        let parametro = [];
        let sql = '';
        switch (categoria) {
            case 'nacional':
                return res.status(200).send(Extructura_class_1.default.nacional);
                break;
            case 'provincial':
                return res.status(200).send(Extructura_class_1.default.provincia);
                break;
            case 'municipio':
                nombre = 'descripciondistritomunicipal';
                campoQuery = `where idprovincia = @intVal `;
                parametro.push({ campo: 'intVal', tipo: 'Int', valor: query['prov'] });
                break;
            case 'recintos':
                nombre = 'descripcioncolegio';
                campoQuery = ` WHERE iddistritomunicipal = @intVal `;
                parametro.push({ campo: 'intVal', tipo: 'Int', valor: query['muni'] });
                break;
            case 'colegios':
                nombre = 'codigocolegio';
                campoQuery = ` WHERE idrecinto = @intVal `;
                parametro.push({ campo: 'intVal', tipo: 'NVarChar', valor: query['recinto'] });
                break;
            default:
                break;
        }
        sql = `SELECT count(DISTINCT idcolegio) as colegios, count(cedula) as cantidad, ${nombre} as nombre, (CONVERT(int,edad/5)) as rangoedad, idSexo  FROM [dbPRM].[dbo].[VWCedulados]  ${campoQuery} group by ${nombre}, (CONVERT(int,edad/5)), idsexo  order by count(cedula) desc`;
        if (nombre !== '') {
            consulta.consulta(sql, parametro).then(data => {
                let datos;
                datos = data;
                if (categoria === 'nacional') {
                    for (let i = 0; i < datos.length; i++) {
                        datos[i]['nombre'] = Extructura_class_1.default.zonas[datos[i]['nombre']];
                    }
                }
                rangoedad(datos).then(data => {
                    return res.status(200).send({ datos: data });
                });
            });
        }
        else {
            return res.status(200).send({ datos: [] });
        }
    }
}
exports.default = ColegiosCtls;
