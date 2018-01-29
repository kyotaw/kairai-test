'use strict';

const channelController = require('./controllers/channel_controller')
    , ChannelConnection = require('./models/channel_connection').ChannelConnection;

function routes_ws(socketio) {

    socketio.path('/api/data_stream');

    const sourcesIo= socketio.of('/sources');
    sourcesIo.on('connection', (socket, ack) => {
        const conn = new ChannelConnection(sourcesIo, socket, ack);
        channelController.openChannel(conn);
    });

    const subscriptionIo = socketio.of('/subscription');
    subscriptionIo.on('connection', (socket, ack) => {
        const conn = new ChannelConnection(subscriptionIo, socket, ack);
        channelController.addListener(conn);
    });
}

module.exports = routes_ws
