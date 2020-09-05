const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./routes');

const app = express(); // só o servidor http
const server = require('http').Server(app); // unirá os 2 servidor http e o websocket
const io = require('socket.io')(server);// unirá os 2 servidor http e o websocket

const connectedUsers = {};//stateless - para prod não é legal isso, mas é ok para exercício

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;

    /* Test de websocket - Server-Side
    console.log('Nova conexão', socket.id);
    socket.on('hello', message => {
        console.log(message);
    })

    setTimeout( () => {
        socket.emit('world', {
            message: 'OmniStack'
        });
    }, 5000)
    */
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.i5ohh.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {//middleware, que vai executar tudo aqui, e depois chamar o next.
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next(); // Permite seguir as linhas abaixo.
}); 

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);