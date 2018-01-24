'use strict';

const dataSourceService = require('../services/data_source_service')
    , channelService = require('../services/channel_service')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors.js');

const channelController = {

    openChannel(socket, ack) {
        dataSourceService.get({hash: socket.handshake.query.hash}).then(dataSources => {
            if (dataSources.length === 0) {
                socket.emit('error', shortcut.errorPayload(new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND)));
                socket.disconnect(true);
            } else {
                channelService.openChannel(dataSources[0], socket).then(() => {
                    console.log('Open channel: ' + dataSources[0].productId.hash);
                    if (ack) {
                        ack();
                    }
                }).catch(err => {
                    socket.emit('error', errors.internalError());
                });
            }
        }).catch(err => {
            socket.emit('error', err); 
        });
    },

    addListener(socket, ack) {
        dataSourceService.get({hash: socket.handshake.query.hash}).then(dataSources => {
            if (dataSources.length === 0) {
                socket.emit('error', shortcut.errorPayload(new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND)));
                socket.disconnect(true);
            } else {
                channelService.addListener(dataSources[0], socket).then(() => {
                    console.log('Add listener of: ' + dataSources[0].productId.hash);
                    if (ack) {
                        ack();
                    }
                }).catch(err => {
                    socket.emit('error', errors.internalError());
                });
            }
        }).catch(err => {
            socket.emit('error', err);
        });
    }

}

module.exports = channelController;
