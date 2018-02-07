'use strict';

const ChannelMember = require('./channel_member').ChannelMember
    , ChannelStates = require('./channel_status').ChannelStates;

class ChannelHost extends ChannelMember {

    constructor(dataSource, conn) {
        super(dataSource.productId.hash);
        this.dataSource = dataSource;
        this.conn = conn;
        this.channel = null;
        
        this.conn.on('disconnect', reason => {
            if (this.channel) {
                this.status.state = ChannelStates.OFFLINE;
                console.log('State Offline')
                this.channel.onHostDisconnect();
            }
        });
    }

    get id() {
        return this.dataSource.productId.hash;
    }

    async start() {
        this.conn.emit('start');
        this.status.state = ChannelStates.ACTIVE;
        this.conn.on('data', data => {
            if (this.channel) {
                this.channel.onData(data);
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
