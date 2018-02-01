'use strict';

const socketio = require('socket.io-client');

const listener = socketio('https://kairai.herokuapp.com/subscription', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "ea064893939e3472f7d094269cc75655ee8110b6c2a4ea97cfe3617eb9caf0e5"
    }
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.accelX + ', ' + data.accelY + ', ' + data.accelZ);
});

listener.connect();

