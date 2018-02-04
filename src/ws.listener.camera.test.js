'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/subscription', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "5622088d38349087adcfa0f20bcb79601cb3c8adc6950af72c742d4d2f706197"
    }
});

listener.on('data', (data) => {
//    console.log('Recieved data: ' + data.accelX + ', ' + data.accelY + ', ' + data.accelZ);
    console.log('Recieved data: ' + data.width + ', ' + data.height+ ', ' + data.data);
});

listener.connect();

