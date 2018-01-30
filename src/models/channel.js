'use strict';

const ChannelListener = require('./channel_listener').ChannelListener;

class Channel {
    constructor(host) {
        this.host = host;
        host.channel = this;
        this.listeners = [];
    }

    get channelId() { return this.host.channelId; }
    get status() { return this.host.status; }

    async start() {
        if (this.status.isReady) {
            await this.host.start()
        }
    }

    async stop() {
        if (this.status.isActive) {
            await this.host.stop();
        }
    }

    addListener(listenerConn) {
        const listener = new ChannelListener(this.dataSource, listenerConn);
        listener.channel = this;
        this.listeners.push(listener);
    }

    broadcast(data) {
        for (let listener of this.listeners) {
            listener.recieve(data);
        }
    }

    // ChannelHost delegations
    onData(data) {
        this.broadcast(data);
    }

    onHostDisconnect(reason) {
        for (let listener of this.listeners) {
            listener.disconnect();
        }
    }

    // ChannelListener delegations
    onListenerDisconnect(listener) {
        this.listeners.some((val, i) => {
            if (val === listener) {
                this.listeners.splice(i, 1);
            }
        });
        if (this.listeners.length === 0) {
            this.stop();
        }
    }
}

module.exports.Channel = Channel;