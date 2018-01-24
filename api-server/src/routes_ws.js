'use strict';

const channelController = require('./controllers/channel_controller');

function routes_ws(socketio) {

    const sourcesIo= socketio.of('/sources');
    sourcesIo.on('connection', channelController.openChannel);

    const subscriptionIo = socketio.of('/subscription');
    subscriptionIo.on('connection', channelController.addListener);
}

module.exports = routes_ws
