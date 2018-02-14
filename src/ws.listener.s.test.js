'use strict';

const socketio = require('socket.io-client');

const listener = socketio('https://kairai.herokuapp.com/aggregation', {
//const listener = socketio('http://localhost:6171/aggregation', {
    query: {
        path: '/api/data_stream/',
        dataSourceType: 'barometer',
        latitude: 35.7007777,
        longitude: 139.71475,
        radius: '200', // km
        method: 'raw'
    }
});

listener.on('data', (data) => {
    console.log(data);
});

listener.connect();

