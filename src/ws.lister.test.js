'use strict';

const socketio = require('socket.io-client');

const listener = socketio('http://localhost:6171/subscription', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "0638c30247c6c104661dc7f1b78fb0dcc5eb69f0cae228c57f7e7cd09eda65d5"
    }
});

listener.on('connect', () => {
   console.log('Listener CONECT!!!!!!!!!'); 
});

listener.on('data', (data) => {
    console.log('Recieved data: ' + data.accelX + ', ' + data.accelY + ', ' + data.accelZ);
});

listener.connect();

