'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "a9da57797d39979441a64a27542c2255a3586c0b34d4ef5b1d294d579970d901"
    }
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.x + ', ' + data.y + ', ' + data.y);
});

listener.connect();

