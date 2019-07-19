"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
const corsOptions = {
    origin: '*',
};
app.use(express.json());
app.use(cors(corsOptions));
app.set('port', process.env.PORT || 1340);
var http = require('http').Server(app);
let io = socketio(http);
app.get('/', (req, res) => {
    res.send('hello world');
});
app.post('/new-order', (req, res) => {
    console.log(req.body.orderId);
    io.emit('newOrder', req.body.orderId);
    res.send('order emitted');
});
let onlineUsers = 0;
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('userOnline', () => {
        onlineUsers += 1;
        console.log('online');
        console.log(onlineUsers);
        io.emit('userCountUpdate', onlineUsers);
    });
    socket.on('userCountRequest', () => {
        io.emit('userCountUpdate', onlineUsers);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
        onlineUsers -= 1;
        console.log(onlineUsers);
        io.emit('userCountUpdate', onlineUsers);
    });
});
const server = http.listen(1340, () => {
    console.log('Listening on port 1340');
});
//# sourceMappingURL=server.js.map