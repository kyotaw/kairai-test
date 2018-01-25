'use strict';

const socketio = require('socket.io-client');

const socket = socketio('http://localhost:6171/sources', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "0638c30247c6c104661dc7f1b78fb0dcc5eb69f0cae228c57f7e7cd09eda65d5"
    }
});

socket.on('connect', () => {
   console.log('Client CONECT!!!!!!!!!'); 
});

socket.on('error', err => {
    console.error(err);
});

let timer = null;
socket.on('start', () => {
    console.log('START delivering data');
    timer = setInterval(() => {
        const data = {accelX: Math.random() % 10, accelY: Math.random() % 10, accelZ: Math.random() % 10};
        console.log('Send data: ' + data.x + ', ' + data.y + ', ' + data.z);
        socket.emit('data', data)
    }, 10);
});

socket.on('stop', () => {
    console.log('STOP delivering data');
    if (timer) {
        clearInterval(timer);
    }
});

socket.connect();

