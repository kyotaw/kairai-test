'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/aggregation', {
    query: {
        path: '/api/data_stream/',
        dataSourceType: 'barometer',
        latitude: 35.7007777,
        longitude: 170.71475,
        radius: '200',
        method: 'raw'
    }
});

listener.on('data', (data) => {
    console.log(data);
});

listener.connect();

