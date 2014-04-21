var express = require('express');
var app = express();


// Include: Socket.IO
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socketClientIO = require('socket.io-client');
console.log(socketClient);
var socketClient = socketClientIO.connect('http://localhost:5747');
//socketClient('http://localhost:5747');


// Listen.
server.listen(8080);

// Configure IO.
io.set('log level', 2); // Debug = 3

// Configure App.
app.configure(function(){

    // Fix for POST body.
    app.use(express.bodyParser());

});

// Default GET.
app.get('/', function (req, res) {

    res.send('Triggers mapped under /jira');

});

// POST.
app.post('/jira', function (req, res) {

    var post_body = req.body;

    io.sockets.emit('trigger', post_body);

    socketClient.emit('put-status', {

        statusUpdate: post_body

    });

    res.send('ok');

});

// Default.
//app.all('*', debugRequest);

// Error handling.
app.use(function( err, req, res, next ) {

    console.error( err.stack );

    res.send( 500, 'Something broke :\\' );

});

// IO magic.
io.sockets.on('connection', function (socket) {


    socketClient.on('connect', function() {


        io.sockets.on('trigger', function( data ) {

            console.log( data );

        });

        socketClient.on('disconnect', function() {

        });

    });

});

// Debugger.
function debugRequest(a, b, c) {

    console.log(a);

    // Out.
    b.send('.');

}