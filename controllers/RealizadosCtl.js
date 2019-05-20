'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MenuCtl_1 = __importDefault(require("./MenuCtl"));
const ConsultaCtl_1 = __importDefault(require("./ConsultaCtl"));
const Consulta = new ConsultaCtl_1.default();
class Casos {
    constructor() {
    }
    inicio(req, res) {
        let pagina = req.params.operativo;
        let caso = req.query.caso;
        let datos = { menu: MenuCtl_1.default.menus('realizados') };
        let enviar = {
            title: 'Operativos Realizados',
            datos: datos
        };
        return res.render('realizados', enviar);
    }
}
exports.default = Casos;
