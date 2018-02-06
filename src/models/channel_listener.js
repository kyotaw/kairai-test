'use strict';

const ChannelMember = require('./channel_member').ChannelMember
    , ChannelStates = require('./channel_status').ChannelStates;

class ChannelListener extends ChannelMember {

    constructor(conn, source) {
        super();
        this.conn = conn;
        this.source = source
        
        this.conn.on('disconnect', reason => {
            if (this.source) {
                this.source.onListenerDisconnect(this);
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

    recieve(data, host) {
        this.conn.emit('data', data);
    }
}

module.exports.ChannelListener = ChannelListener;
