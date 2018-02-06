'use strict';

const SocketIoServer = require('socket.io')
    , channelController = require('./controllers/channel_controller')
    , ChannelConnection = require('./models/channel_connection').ChannelConnection;

function routes_ws(httpServer) {
    const io = new SocketIoServer(httpServer, {
        path: '/api/data_stream',
        transports: ['websocket', 'polling']
    });

    const sourcesIo= io.of('/sources');
    sourcesIo.on('connection', (socket, ack) => {
        const conn = new ChannelConnection(sourcesIo, socket, ack);
        channelController.openChannel(conn);
    });

    const subscriptionIo = io.of('/direct');
    subscriptionIo.on('connection', (socket, ack) => {
        const conn = new ChannelConnection(subscriptionIo, socket, ack);
        channelController.addDirectListener(conn);
    });

    const aggregationIo = io.of('/aggregation');
    aggregationIo.on('connection', (socket, ack) => {
        const conn = new ChannelConnection(aggregationIo, socket, ack);
        channelController.addAggregationListener(conn);
    });
}

module.exports = routes_ws
