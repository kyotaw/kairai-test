'use strict';

const dataSourceService = require('../services/data_source_service')
    , channelService = require('../services/channel_service')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors.js');

const channelController = {

    openChannel(conn) {
        channelService.openChannel(conn).then((channel) => {
            console.log('Open channel: ' + channel.channelId);
            if (conn.ack) {
                conn.ack();
            }
        }).catch(err => {
            conn.disconnect();
        });
    },

    addListener(conn) {
        channelService.addListener(conn).then((channel) => {
            console.log('Add listener of: ' + channel.channelId);
            if (conn.ack) {
                conn.ack();
           }
        }).catch(err => {
            conn.disconnect();
       });
    }

}

module.exports = channelController;
