'use strict';

const socketio = require('socket.io-client');

const socket = socketio('http://localhost:6171/sources', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: '29daae5acc72b62ec56d9266a45b46a38e313b92dbefb9abb720f5858a0ee3f2',
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
        const data = {x: Math.random() % 10, y: Math.random() % 10, z: Math.random() % 10};
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

