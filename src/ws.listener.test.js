'use strict';

const socketio = require('socket.io-client');

//const listener = socketio('http://localhost:6171/direct', {
const io = socketio('https://kairai.herokuapp.com/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: 'a1440b79415e9406bd73ae674647b35a88eaa301d24fe30d15b34f6b8327c4b8'
    }
});

io.on('data', data => {
    console.log(data);
});

io.connect();
