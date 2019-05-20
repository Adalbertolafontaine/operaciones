'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const server = new http_1.default.Server(app_1.default);
const io = socket_io_1.default(server);
io.on('connection', () => { });
require('./controllers/socket')(io);
global['io'] = io;
server.listen(config_1.default.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config_1.default.port}`);
});
