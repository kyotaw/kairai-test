'use strict';

const socketio = require('socket.io-client');

//const listener = socketio('http://localhost:6171/direct', {
const io = socketio('https://kairai.herokuapp.com/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: 'bd161dafc765d42424591c83615279328cc3b7b73fdd68d87b8544492958324d'
    }
});

io.on('data', data => {
    console.log(data);
});

io.connect();
