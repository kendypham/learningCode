import * as express from 'express';
import * as cors from 'cors';

import * as socketio from 'socket.io';
import * as path from 'path';
import { disconnect } from 'cluster';

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: '*', // MUST CHANGE AFTER TESTING
};

app.use(express.json());
app.use(cors(corsOptions));
app.set('port', process.env.PORT || 1340);

var http = require('http').Server(app);
let io = socketio(http);

app.get('/', (req: any, res: any) => {
	res.send('hello world');
});

app.post('/new-order', (req: any, res: any) => {
	console.log(req.body.orderId);
	io.emit('newOrder', req.body.orderId);
	res.send('order emitted');
});

let onlineUsers: number = 0;

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
		console.log('disconnected')
		onlineUsers -= 1;
		console.log(onlineUsers);
		io.emit('userCountUpdate', onlineUsers);
	});
});

const server = http.listen(1340, () => {
	console.log('Listening on port 1340');
});