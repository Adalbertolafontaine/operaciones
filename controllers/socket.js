module.exports = io => {
    let sockete;
    io.on('connection', socket => {
        sockete = socket;
        socket.on('nuevo', (coords) => {
            console.log(coords);
            socket.broadcast.emit('nuevo', coords);
        });
        socket.on('cambio', (coords) => {
            console.log(coords);
            socket.broadcast.emit('nuevo', 'coords');
        });
    });
    function enviar(mensaje) {
        sockete.on('nuevvo', (coords) => {
            console.log(coords);
            sockete.broadcast.emit('newUserCoordinates', coords);
        });
    }
};
