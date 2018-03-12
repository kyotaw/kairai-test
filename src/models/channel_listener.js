'use strict';

const ChannelMemberStatus = require('./channel_status').ChannelMemberStatus
    , ChannelStates = require('./channel_status').ChannelStates;

class ChannelListener {

    constructor(conn) {
        this.conn = conn;
        this.status = new ChannelMemberStatus();
        this._source = null;
        
        this.conn.onDisconnect(reason => {
            if (this._source) {
                this._source.onListenerDisconnect(this);
            }
        });
    }

    get id() {
        return 'unknown';
    }
    
    setSource(source) {
        if (!source) {
            this.disconnect();
        } else{
            this.status.state = ChannelStates.ACTIVE;
        }
        this._source = source;
    }

    removeSource(source) {
        if (this._source === source) {
            this.setSource(null);
        }
    }

    disconnect() {
        this.conn.disconnect();
        this.status.state = ChannelStates.OFFLINE;
    }

    recieve(data, source) {
        this.conn.sendData(data);
    }
}

module.exports.ChannelListener = ChannelListener;
