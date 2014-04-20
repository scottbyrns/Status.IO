var io = require('socket.io').listen(5747);

io.sockets.on('connection', function (socket) {

    socket.on('put-status', function (data) {

        console.log( "Status Update" );
        console.log( data );

    });

    socket.emit('remote-server-status', { status: 'online' });

});

