'use strict';

const socketio = require('socket.io-client')
    , timestamp = require('./helpers/time').timestamp;

const socket = socketio('http://localhost:6171/sources', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: '8f740dc93cbc42399c162c25b2a886ea457300acccff22beb9e4a429ee9c0b16',
        latitude: 36,
        longitude: 171
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

