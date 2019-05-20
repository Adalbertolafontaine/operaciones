'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 3000,
    dirrecion: '',
    sql: {
        authentication: {
            type: 'default',
            options: {
                userName: 'mapeo',
                password: 'Alterno1997',
            }
        },
        options: {
            encrypt: true,
            database: 'Operaciones'
        },
        server: 'localhost',
    }
};
