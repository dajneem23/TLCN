const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
var server = require('http').createServer(app);
dotenv.config();
const appPort = process.env.APP_PORT;
const socketPort = process.env.SOCKET_PORT;
const MongoDocker=process.env.mongodb_docker
const sessionMiddleware = session({
	// name:'access_token',
	secret: process.env.secretKey,
	resave: false, 
 	saveUninitialized: true,
	// cookie: { secure: false }
});

app.use(sessionMiddleware);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.json());
const AWS_URL = 'http://52.7.3.87:3000';
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', true);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'http://127.0.0.1',
			AWS_URL,
		],
	})
);

(async () => {
	await mongoose.connect(MongoDocker, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('mongoose connect');
})();

const ComplierRouter = require('./Routers/Complier.route');
app.use('/complier', ComplierRouter);
const UserRoute = require('./Routers/User.route');
app.use('/user', UserRoute);
const JobRouter = require('./Routers/Job.router');
app.use('/job', JobRouter);
const ProblemRouter = require('./Routers/Problem.router');
app.use('/problem', ProblemRouter);
//route for test serrver 
app.get('/test',passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log('test',req.user)
	return res.status(200).json({
		ok: 'true',
	});
});

const io = require('socket.io')(server);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));
io.use(wrap(cookieParser()));	
// io.use(wrap(passport.authenticate('jwt', { session: false } , (err, user) => {
// 		console.log("err", err)
// 		if (err) throw err;
// 			console.log('user 1',user.userName)
// 			if (user) next()
// 	})
// ))
io.use((socket, next) => {
	passport.authenticate('jwt', { session: false } , (err, user) => {
				console.log("err", err)
				if (err) throw err;
					console.log('user 2',user.userName)
		if (user) {
			socket.request.user=user
			next()
		}
		
	})(socket.request,{},next)
})
io.use((socket, next) => {
	console.log("rq user",socket.request.user)
	// console.log('session', socket.request.session)
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'))
  }
});
io.on('connection', (socket) => {
		console.log('connection user', socket.request.user)
	console.log('socket id',socket.id);
  socket. on('join_room', (data) => {
    console.log(data)
		console.log('user join', data);
		socket.join(data);
	});
	socket.on('send_message', data => {
		console.log(data)
	})
	socket.on('disconnect', (id) => {
		console.log('socket disconnected',id);
	});
	socket.emit('output',"ouputttttt")
});


server.listen(socketPort, () => {
	console.log('socket is running!! ' + socketPort);
});

app.listen(appPort, () => {
	console.log('server is running!! ' + appPort);
});

//use for hhoy
// app.listen(port, '0.0.0.0', () => {
// 	console.log('server is running!! ' + port);
// });