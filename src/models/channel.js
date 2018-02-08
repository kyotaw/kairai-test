'use strict';

const ChannelListener = require('./channel_listener').ChannelListener;

class Channel {
    constructor(host) {
        this.host = host;
        this.listeners = [];
        host.channel = this;
    }

    get id() { return this.host.id; }
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

    addListener(listener) {
        this.listeners.push(listener);
    }

    broadcast(data) {
        for (let listener of this.listeners) {
            listener.recieve(data, this.host);
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

    toDict() {
        return {
            'state': this.status.state,
            'host': this.host.id,
            'listners': this.listeners.map(l => l.id),
        }
    }
}

module.exports.Channel = Channel;
