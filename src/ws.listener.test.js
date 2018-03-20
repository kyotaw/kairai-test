'use strict';

const socketio = require('socket.io-client');

const io = socketio('http://localhost:6171/direct', {
//const io = socketio('https://kairai.herokuapp.com/direct', {
    query: {
        path: '/api/data_stream',
        dataSourceHash: '5c11bae2db2a33fac32249c4b410bb1d34d247202040ec6e5df8b517e67eaa98a161439f0d910065cf2877be9f647b190786cf98c39d6f0160fe0ddfce3c7170'
    }
});

io.on('data', data => {
    console.log(data);
});

io.connect();
