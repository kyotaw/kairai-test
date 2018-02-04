'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/subscription', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "bd161dafc765d42424591c83615279328cc3b7b73fdd68d87b8544492958324d"
    }
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.pressure + ' hPa');
});

listener.connect();

