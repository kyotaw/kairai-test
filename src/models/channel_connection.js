'use strict';

class ChannelConnection {
    
    constructor(io, socket, ack) {
        this.io = io;
        this.socket = socket;
        this.ack = ack;
    }

    get query() { return this.socket.handshake.query; }

    disconnect() {
        this.socket.disconnect(true);
    }

    on(eventName, cb) {
        this.socket.on(eventName, cb);
    }

    emit(eventName, params, cb) {
        this.socket.emit(eventName, params, cb);
    }
}

module.exports.ChannelConnection = ChannelConnection;
