'use strict';

const socketio = require('socket.io-client');

const io = socketio('http://localhost:6171/direct', {
//const io = socketio('https://kairai.herokuapp.com/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: '324ff6cdefd9571fcef991516dc0f745cd1b73c9a017586bdb43fc13f50ce0ce74dcea26a5c2be537ad6808ba66563b4c113ca3b9ebcc98b6ae933a788dc79e5'
    }
});

io.on('data', data => {
    console.log(data);
});

io.connect();
