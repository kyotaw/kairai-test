'use strict';

const ChannelMember = require('./channel_member').ChannelMember
    , ChannelStates = require('./channel_status').ChannelStates;

class ChannelListener extends ChannelMember {

    constructor(channelId, conn) {
        super(channelId);
        this.conn = conn;
        
        this.conn.on('disconnect', reason => {
            if (this.channel) {
                this.channel.onListenerDisconnect(this);
            }
        });
    }

    get id() {
        return 'unknown';
    }

    disconnect() {
        this.conn.disconnect();
        this.status.state = ChannelStates.OFFLINE;
    }

    recieve(data) {
        this.conn.emit('data', data);
    }
}

module.exports.ChannelListener = ChannelListener;
