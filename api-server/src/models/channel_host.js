'use strict';

const ChannelMember = require('./channel_member').ChannelMember
    , ChannelListener = require('./channel_listener').ChannelListener;

class ChannelHost extends ChannelMember {

    constructor(dataSource, socket) {
        super(dataSource, socket);
        this.listeners = [];
        this.socket.on('data', this.onData);
    }

    start() {
        this.soket.emit('start');
    }

    stop() {
        this.socket.emit('stop');
    }

    addListener(listenerSocket) {
        const listener = new ChannelListener(this.dataSource, listenerSocket);
        this.listeners.push(listener);
    }

    onData(data) {
        this.socket.broadcast.emit(data);
    }
}

module.exports.ChannelHost = ChannelHost;
