'use strict';

const ChannelMemberStatus = require('./channel_status').ChannelMemberStatus
    , ChannelStates = require('./channel_status').ChannelStates;

class ChannelHost {

    constructor(dataSource, conn) {
        this.dataSource = dataSource;
        this.conn = conn;
        this.status = new ChannelMemberStatus();
        this._channel = null;
        
        this.conn.on('disconnect', reason => {
            if (this._channel) {
                this.status.state = ChannelStates.OFFLINE;
                console.log('State Offline')
                this._channel.onHostDisconnect();
            }
        });
    }

    get id() {
        return this.dataSource.productId.hash;
    }

    setChannel(channel) {
        if (channel) {
            this._channel = channel;
            this.status.state = ChannelStates.READY;
        } 
    }

    async start() {
        this.conn.emit('start');
        this.status.state = ChannelStates.ACTIVE;
        this.conn.on('data', data => {
            if (this._channel) {
                data.location = data.location ||
                    this.dataSource.location ? this.dataSource.location.toDict() : null;
                const d = new this.dataSource.dataClass(data);
                this._channel.onData(d);
            }
        });
        console.log('State Active')
    }

    async stop() {
        this.conn.emit('stop');
        this.status.state = ChannelStates.READY;
        console.log('State Ready')
    }

}

module.exports.ChannelHost = ChannelHost;
