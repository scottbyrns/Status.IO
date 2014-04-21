var io = require('socket.io').listen(5747);

io.sockets.on('connection', function (socket) {

    var mainSocket = socket;

    mainSocket.on('put-status', function (data) {

        mainSocket.emit('remote-server-status', { status: 'online' });
        this.emit("status-update", data);

        console.log( "Status Update" );
        console.log( data );

    }.bind(mainSocket));

    mainSocket.emit('remote-server-status', { status: 'online' });

});

