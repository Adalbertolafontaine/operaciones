'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exphbs = require("express-handlebars");
const path = require("path");
const helpersConf = require('./helpers');
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = __importDefault(require("http"));
let app = express_1.default();
class Server {
    constructor(port) {
        this.port = port;
        this.server = http_1.default.createServer(app);
    }
    static init(port) {
        return new Server(port);
    }
    start(callback) {
        this.server.listen(config_1.default.port, callback);
    }
}
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.engine('.hbs', exphbs({
    defaultLayout: 'defaul',
    extname: '.hbs',
    helpers: helpersConf.helpers
}));
app.disable('x-powered-by');
app.set("view engine", ".hbs");
app.use(config_1.default.dirrecion, express_1.default.static(path.join(__dirname, 'public')));
app.use(config_1.default.dirrecion, routes_1.default);
exports.default = app;
