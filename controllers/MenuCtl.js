'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const menu = ['home', 'activos', 'realizados', 'casos'];
const submenu = { casos: ['nuevo'] };
function menus(smenu) {
    var datos = [];
    for (const i of menu) {
        let dirrecion = config_1.default.dirrecion;
        dirrecion += (i == 'home') ? "/" : `/${dirrecionWeb(i)}`;
        let temp = {
            nombre: (i == 'home') ? "" : i,
            dirrecion: dirrecion,
            clase: `${(i == 'home') ? "icon-home" : ""}`,
            activo: (i === smenu) ? 'activo ' : ''
        };
        if (i in submenu) {
            temp['submenu'] = submenu[i];
        }
        datos.push(temp);
    }
    datos['raiz'] = config_1.default.dirrecion;
    datos['js'] = `${dirrecionWeb(smenu)}.`;
    return datos;
}
function dirrecionWeb(s) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "¥");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    return r;
}
function comandos() {
    let Comandos = {};
    menu.forEach(element => {
        let tem = dirrecionWeb(element);
        Comandos[tem] = `./src/public/script/${tem}.ts`;
    });
    return Comandos;
}
exports.default = { menus, dirrecionWeb, comandos };
