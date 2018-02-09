'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.x + ', ' + data.y + ', ' + data.y);
});

listener.connect();

