'use strict';

const socketio = require('socket.io-client')
    , timestamp = require('./helpers/time').timestamp;

const socket = socketio('http://localhost:6171/sources', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: "af063a9570d3f02b67349bd2e94c9af56d2fd03a777786aff3c8212d5925f2b8",
        latitude: 35,
        longitude: 170
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
        const data = {pressure: Math.random() % 100, timestamp: timestamp()};
        console.log('Send data:');
        console.log(data);
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

