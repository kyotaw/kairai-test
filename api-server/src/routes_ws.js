'use strict';

function routes_ws(socketio) {

    const dataSourcesIo = socketio.of('/data_sources');
    dataSourcesIo.on('connection', socket => {
        console.log('connected!!!!!!!!!!!!!!!!!!!!!!!!');
    });

}

module.exports = routes_ws
