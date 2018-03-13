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

    onDisconnect(cb) {
        this.socket.on('disconnect', cb);
    }

    onData(cb) {
        this.socket.on('data', cb);
    }
    
    sendData(data) {
        this.socket.emit('data', data);
    }

    sendMessage(msg, params, cb) {
        this.socket.emit(msg, params, cb);
    }

}



module.exports.ChannelConnection = ChannelConnection;
