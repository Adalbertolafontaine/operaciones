'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("./MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const Consulta = new ConsultaCtl_1.default();
let elementos = [
    { titulo: 'detenidos', renglon: ['hombres', 'mujeres'], categorias: [''], cabceras: ['detenidos', 'cantidad'], categoria: false },
    { titulo: 'armas', renglon: ['fuego', 'blanca'], categorias: [''], cabceras: ['tipo', 'cantidad'], categoria: false },
    { titulo: 'vehiculos', renglon: ['motor', 'carro', 'jepeta'], categorias: [''], cabceras: ['tipo', 'cantidad'], categoria: false },
    { titulo: 'dinero', renglon: ['rd$', 'us$', 'eu$'], categorias: [''], cabceras: ['divisas', 'cantidad'], categoria: false },
    { titulo: 'sustancias', renglon: ['cocaina', 'marihuana', 'crack', 'heroína', 'hachis'], categorias: ['gramos', 'porciones'], cabceras: ['sustancias', 'gramos', 'porciones'], categoria: true },
    { titulo: 'Otras sustancias', renglon: ['sustancia', 'gramos', 'porciones'], categorias: ['1', '2'], cabceras: ['sustancias', 'gramos', 'porciones'], categoria: true },
    { titulo: 'decomisos', renglon: ['celulares', 'balanzas'], categorias: [''], cabceras: ['tipo', 'cantidad'], categoria: false },
];
let decomisos = {
    detenidos: [{ nombre: 'hombres', peso: 'hombres', }, { nombre: 'mujeres', peso: 'mujeres' }],
    sustancia: [{ nombre: 'cocaina' }, { nombre: 'marihuana' }, { nombre: 'crack' }, { nombre: 'heroína' }, { nombre: 'hachis' }],
    armas: [{ nombre: 'fuego', peso: 'armas de fuego', }, { nombre: 'blanca', peso: 'armas blanca' }],
    vehiculos: [{ nombre: 'motor', peso: 'motores' }, { nombre: 'carro', peso: 'carros' }, { nombre: 'jepeta', peso: 'jepeta' }],
    divisas: [{ nombre: 'rd$', peso: 'pesos' }, { nombre: 'us$', peso: 'dolares' }, { nombre: 'eu$', peso: 'euros' }],
    otras: [{ nombre: 'celulares', peso: 'celulares' }, { nombre: 'balanzas', peso: 'balanzas' }],
};
let medidas = ['porciones', 'gramos'];
let titulos = ['orden', 'division', 'inspectoria', 'seccion', 'provincia', 'municipio', 'barrio', 'actividad', 'fecha', 'salida', 'informacionsalida', 'longitud', 'latitud'];
class Casos {
    constructor() {
    }
    inicio(req, res) {
        let datos = { menu: MenuCtl_1.default.menus('casos') };
        let enviar = {
            title: 'Operativos',
            datos: datos
        };
        datos.menu['js'] = `${'listado'}.`;
        enviar['listado'] = true;
        return res.render('casos', enviar);
    }
    crear(req, res) {
        let datos = { menu: MenuCtl_1.default.menus('casos') };
        let enviar = {
            title: 'Operativos',
            datos: datos
        };
        let parametro = [];
        datos.menu['js'] = `nuevo.`;
        return res.render('nuevo', enviar);
    }
    nuevo(req, res) {
        let datos = req.body;
        let barrio = (!Array.isArray(datos['barrio'])) ? [datos['barrio']] : datos['barrio'];
        let campoQuery = ``;
        let parametro = [];
        titulos.forEach(element => {
            if (campoQuery !== '')
                campoQuery += ',';
            switch (element) {
                case 'barrio':
                    campoQuery += ` @${element}`;
                    parametro.push({ campo: element, tipo: 'NVarChar', valor: barrio.toString() });
                    break;
                default:
                    campoQuery += `@${element} `;
                    parametro.push({ campo: element, tipo: 'NVarChar', valor: datos[element] });
                    break;
            }
        });
        let sql = `INSERT INTO [dbo].[Operativos] (${titulos.toString()}) VALUES (${campoQuery})`;
        Consulta.consulta(sql, parametro).then(data => {
            return res.send({ condicion: 'correcto' }).status(200);
        });
    }
    decomisos(req, res) {
        let caso = req.query.caso;
        let datos = { menu: MenuCtl_1.default.menus('casos') };
        let enviar = {
            title: 'Operativos',
            datos: datos
        };
        datos.menu['js'] = `resultado.`;
        let parametro = [];
        if (isNaN(caso)) {
            return res.redirect('/casos');
        }
        else {
            let verificacion = `SELECT COUNT([id]) as cantidad  FROM [Operaciones].[dbo].[Decomisos]  where operativo = ${caso}`;
            Consulta.consulta(verificacion, []).then(element => {
                if (element[0]['cantidad'] > 0) {
                    return res.redirect('/casos');
                }
                enviar['accion'] = 'resultados';
                enviar['elementos'] = elementos;
                let sql = `SELECT id, orden,CONVERT(varchar(12), fecha,103) AS  fecha, CAST(salida AS varchar(8)) as salida, desc_provincia as provincia,desc_municipio as municipio, desc_division as division, desc_inspectoria as inspectoria, desc_seccion as seccion,desc_actividad as actividad, latitud, longitud  FROM dbo.VWoperativos where id  =@id`;
                parametro.push({ campo: 'id', tipo: 'Int', valor: caso });
                Consulta.consulta(sql, parametro).then(elementos => {
                    let elemento;
                    elemento = elementos;
                    if (elemento.length === 0) {
                        return res.redirect('/casos');
                    }
                    else {
                        enviar['caso'] = elemento[0];
                        return res.render('decomiso', enviar);
                    }
                });
            });
        }
    }
    new_decomisos(req, res) {
        let datos = req.body;
        let sql = '';
        let decomisoSql = '';
        let id = datos['id'];
        let parametroD = [{ campo: 'id', tipo: 'Int', valor: id }];
        let parametro = [{ campo: 'id', tipo: 'Int', valor: id }];
        let informacion = ['novedades', 'informacionll', 'llegada', 'latitud', 'longitud'];
        let categorias = Object.keys(decomisos);
        categorias.forEach(categoria => {
            let temp = decomisos[categoria];
            temp.forEach(element => {
                if (categoria === 'sustancia') {
                    medidas.forEach(peso => {
                        if (datos[`${element.nombre}${peso}`] > 0) {
                            if (decomisoSql !== '')
                                decomisoSql += ',';
                            decomisoSql += `(@id,'sustancias','${element.nombre}',@${element.nombre}${peso},'${peso}')`;
                            parametroD.push({ campo: `${element.nombre}${peso}`, tipo: 'Decimal', valor: datos[`${element.nombre}${peso}`] });
                        }
                    });
                }
                else {
                    if (datos[`${element.nombre}`] > 0) {
                        if (decomisoSql !== '')
                            decomisoSql += ',';
                        decomisoSql += `(@id,'${categoria}','${element.nombre}',@${element.nombre},'${element.peso}')`;
                        parametroD.push({ campo: element.nombre, tipo: 'Decimal', valor: datos[`${element.nombre}`] });
                    }
                }
            });
        });
        informacion.forEach(Element => {
            if (datos[Element] === 0 || datos[Element] === '') {
            }
            else {
                if (sql !== '')
                    sql += ', ';
                if (Element === 'llegada') {
                    parametro.push({ campo: Element, tipo: 'VarChar', valor: `${datos['llegada']}:00.000` });
                }
                else {
                    parametro.push({ campo: Element, tipo: 'VarChar', valor: datos[Element] });
                }
                sql += `${Element} = @${Element}`;
            }
        });
        let sqlcaso = `UPDATE [dbo].[Operativos] SET ${sql} where id = @id`;
        let sqldecomiso = `INSERT INTO [dbo].[Decomisos] (operativo,categoria,nombre,cantidad,unidad)  VALUES ${decomisoSql} `;
        Consulta.consulta(sqldecomiso, parametroD).then(element => {
            Consulta.consulta(sqlcaso, parametro).then(data => {
                return res.send({ condicion: 'correcto' }).status(200);
            });
        });
    }
    getcasos(req, res) {
        let tipo = req.params.estado;
        let caso = req.params.caso;
        let query = req.query;
        let datos = req.body;
        let sql = '';
        let decomiso = {};
        let barrio;
        var obj;
        let campoQuery = '';
        let parametro = [];
        let hoy = new Date();
        let final = (query['final'] === undefined) ? `${fecha(hoy)} 23:59:00` : `${query['final']} 23:59:00`;
        let inicio = (query['inicio'] === undefined) ? `${fecha(hoy)} 00:00:00` : `${query['inicio']} 00:00:00`;
        switch (tipo) {
            case 'activos':
                sql = `SELECT orden,desc_provincia as provincia,desc_municipio as municipio, desc_division as division, desc_inspectoria as inspectoria, desc_seccion as seccion,desc_actividad as actividad, CAST(salida AS varchar(8)) as salida,INFORMACIONSALIDA as informado FROM [Operaciones].[dbo].[VWoperativos] where llegada IS NULL order by fecha, salida desc`;
                break;
            case 'caso':
                if (isNaN(caso)) {
                    return res.send([]).status(200);
                }
                else {
                    sql = `SELECT [id],[orden],CONVERT(varchar(12), fecha,103) AS  fecha,CAST(llegada AS varchar(8)) as llegada,CAST(salida AS varchar(8)) as salida,[desc_division] as division,[desc_inspectoria] as inspectoria,[desc_seccion] as seccion,[desc_provincia] as provincia,[desc_municipio] as municipio,[desc_actividad] as actividad,[longitud],[latitud],[barrio],[informacionll],[informacionsalida],[novedades] FROM [Operaciones].[dbo].[VWoperativos] where id = ${caso}`;
                }
                break;
            case 'casos':
                final = (datos['final'] === undefined) ? `${fecha(hoy)} 23:59:00` : `${datos['final']} 23:59:00`;
                inicio = (datos['inicio'] === undefined) ? `${fecha(hoy)} 00:00:00` : `${datos['inicio']} 00:00:00`;
                campoQuery = ` fecha BETWEEN @inicio AND @final`;
                parametro.push({ campo: 'inicio', tipo: 'NVarChar', valor: inicio });
                parametro.push({ campo: 'final', tipo: 'NVarChar', valor: final });
                titulos.forEach(element => {
                    if (datos[element] === '' || datos[element] === 0 || !datos[element]) {
                    }
                    else {
                        if (campoQuery !== '')
                            campoQuery += ' and ';
                        campoQuery += `${element} =  @${element}`;
                        parametro.push({ campo: element, tipo: 'NVarChar', valor: datos[element] });
                    }
                });
                sql = `SELECT id,orden,desc_provincia as provincia,desc_municipio as municipio, desc_division as division, desc_inspectoria as inspectoria, desc_seccion as seccion,desc_actividad as actividad,CONVERT(varchar(12), fecha,103) AS  fecha,CAST(salida AS varchar(8)) as salida,CAST(llegada AS varchar(8)) as llegada FROM dbo.VWoperativos where ${campoQuery} order by fecha,  llegada,salida`;
                break;
            case 'decomisos':
                campoQuery = tabladecomiso();
                sql = `SELECT [orden],(select S.desc_seccion from Secciones S where o.seccion = S.id) as seccion, ${campoQuery}  FROM dbo.Operativos AS O where llegada is not null and fecha BETWEEN @inicio AND @final`;
                parametro.push({ campo: 'inicio', tipo: 'VarChar', valor: inicio });
                parametro.push({ campo: 'final', tipo: 'VarChar', valor: final });
                break;
            case 'estadisticas':
                sql = `SELECT [orden],(select S.desc_seccion from Secciones S where o.seccion = S.id) as seccion, ${campoQuery}  FROM dbo.Operativos AS O where llegada is not null and fecha BETWEEN @inicio AND @final`;
                parametro.push({ campo: 'inicio', tipo: 'NVarChar', valor: inicio });
                parametro.push({ campo: 'final', tipo: 'NVarChar', valor: final });
                break;
            default:
                return res.send([]).status(200);
        }
        Consulta.consulta(sql, parametro).then((element) => __awaiter(this, void 0, void 0, function* () {
            let elements;
            elements = element;
            if (elements.length === 0)
                return res.send(sql).status(200);
            switch (tipo) {
                case 'activos':
                    return res.send(element).status(200);
                    break;
                case 'caso':
                    let barrios = element[0]['barrio'];
                    element[0]['decomiso'] = yield resultado(caso);
                    barrio = yield Barrios(barrios);
                    element[0]['barrio'] = barrio;
                    obj = element[0];
                    break;
                case 'casos':
                    obj = element;
                    break;
                case 'decomisos':
                    obj = element;
                    break;
                default:
                    break;
            }
            return res.send(obj).status(200);
        }));
    }
    geocasos(req, res) {
        let tipo = req.params.estado;
        let sql = '';
        sql = `SELECT orden,desc_provincia as provincia,desc_municipio as municipio, desc_division as division, desc_inspectoria as inspectoria, desc_seccion as seccion,desc_actividad as actividad,longitud, latitud,llegada,CAST(salida AS varchar(8)) as salida FROM [Operaciones].[dbo].[VWoperativos]  order by salida desc`;
        Consulta.consulta(sql, []).then(caso => {
            let datos;
            datos = caso;
            let campos = ['orden', 'provincia', 'municipio', 'division', 'inspectoria', 'seccion', 'actividad', 'informado'];
            let geojson = {
                "type": "FeatureCollection",
                "name": "Clientes",
                "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                "features": []
            };
            datos.forEach((element) => {
                let temp = {
                    "type": "Feature", "properties": {
                        condicion: (element['llegada'] === null) ? "activos" : "realizados",
                        hora: (element['llegada'] === undefined) ? element['salida'] : element['llegada'],
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [element.longitud, element.latitud]
                    }
                };
                campos.forEach(campo => {
                    temp.properties[campo] = element[campo];
                });
                geojson.features.push(temp);
            });
            return res.status(200).send(geojson);
        });
    }
}
exports.default = Casos;
function resultado(caso) {
    return __awaiter(this, void 0, void 0, function* () {
        let sqlr = `SELECT [categoria],[nombre],[cantidad],[unidad]  FROM [Operaciones].[dbo].[Decomisos]  where operativo = ${caso} order by categoria`;
        let a;
        a = yield Consulta.consulta(sqlr, []);
        let t = [];
        a.forEach(element => {
            let temp = { nombre: '', cantidad: 0, unidad: '' };
            if (element['categoria'] === 'sustancias') {
                temp.unidad = element.unidad;
                temp.nombre = element.nombre;
            }
            else {
                temp.unidad = element.unidad;
                temp.nombre = element.categoria;
            }
            temp.cantidad = element.cantidad;
            t.push(temp);
        });
        return t;
    });
}
function Barrios(lista) {
    return __awaiter(this, void 0, void 0, function* () {
        lista = `('${lista.replace(/,/g, "','")}')`;
        let l = [];
        let sqlr = `SELECT [desc_barrio]  FROM [Operaciones].[dbo].[Barrios] where enlace in ${lista}`;
        let a;
        a = yield Consulta.consulta(sqlr, []);
        for (let i = 0; i < a.length; i++) {
            l.push(a[i]['desc_barrio']);
        }
        return l.toString();
    });
}
function fecha(fecha) {
    var cumpleanos = new Date(fecha);
    let mes = cero(cumpleanos.getMonth() + 1);
    let ano = cumpleanos.getFullYear();
    let dia = cero(cumpleanos.getDate());
    return `${ano}-${mes}-${dia}`;
}
function cero(valor) {
    return (valor < 10) ? `0${valor}` : valor;
}
function tabladecomiso() {
    let campoQuery = '';
    let categorias = Object.keys(decomisos);
    categorias.forEach(categoria => {
        let temp = decomisos[categoria];
        temp.forEach(element => {
            if (categoria === 'sustancia') {
                medidas.forEach(peso => {
                    if (campoQuery !== '')
                        campoQuery += ',';
                    campoQuery += `(select cantidad from dbo.Decomisos AS D where D.operativo = O.id and D.nombre ='${element.nombre}' and D.unidad = '${peso}' ) as ${element.nombre}${peso}`;
                });
            }
            else {
                if (campoQuery !== '')
                    campoQuery += ',';
                campoQuery += `(select cantidad from dbo.Decomisos AS D where D.operativo = O.id and D.nombre ='${element.nombre}' ) as ${element.nombre}`;
            }
        });
    });
    return campoQuery;
}
