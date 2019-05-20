'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const api = express.Router();
const EleccionesCtl_1 = __importDefault(require("../controllers/EleccionesCtl"));
const Partidos_Ctl_1 = __importDefault(require("../controllers/Partidos.Ctl"));
const GeneralCtl_1 = __importDefault(require("../controllers/GeneralCtl"));
const ColegiosCtl_1 = __importDefault(require("../controllers/ColegiosCtl"));
const ElectoresCtl_1 = __importDefault(require("../controllers/ElectoresCtl"));
const CasosCtl_1 = __importDefault(require("../controllers/CasosCtl"));
const ActivosCtl_1 = __importDefault(require("../controllers/ActivosCtl"));
const RealizadosCtl_1 = __importDefault(require("../controllers/RealizadosCtl"));
const casos = new CasosCtl_1.default();
const Eleciones = new EleccionesCtl_1.default();
const partidos = new Partidos_Ctl_1.default();
const general = new GeneralCtl_1.default();
const Colegios = new ColegiosCtl_1.default();
const activos = new ActivosCtl_1.default();
const realizados = new RealizadosCtl_1.default();
const electores = new ElectoresCtl_1.default;
const multer = require('multer');
const upload = multer();
api.get('/', general.inicio);
api.get('/casos', casos.inicio);
api.get('/casos/nuevo', casos.crear);
api.get('/categorias/:categoria', general.categorias);
api.get('/caso/:estado', casos.getcasos);
api.get('/caso/:estado/:caso', casos.getcasos);
api.get('/casog/:estado', casos.geocasos);
api.get('/decomiso', casos.ndecomisos);
api.get('/divisiones', general.division);
api.get('/activos', activos.inicio);
api.get('/realizados', realizados.inicio);
api.post('/nuevo', upload.none(), casos.nuevo);
api.post('/resultados', upload.none(), casos.resultado);
api.post('/caso/:estado', upload.none(), casos.getcasos);
api.get('/*', general.inicio);
module.exports = api;