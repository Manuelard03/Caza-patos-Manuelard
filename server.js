const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const io = socketIo(server);
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Jugador conectado');

    socket.on('shoot', () => {
        console.log('Disparo');
    });

    socket.on('disconnect', () => {
        console.log('Jugador desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
