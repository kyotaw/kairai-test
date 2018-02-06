'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/aggregation', {
    query: {
        path: '/api/data_stream/',
        dataSourceType: 'barometer',
        area: {
            latitude: 35.7007777,
            longitude: 139.71475,
            radius: '100km'
        },
        method: 'average'
    }
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.pressure + ' hPa');
});

listener.connect();

