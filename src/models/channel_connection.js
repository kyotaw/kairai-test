'use strict';

const { Writable } = require('stream');

class ChannelConnection extends Writable {
    
    constructor(io, socket, ack) {
        super({
            highWaterMark: 128,
            objectMode: true
        });
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
        this.write(data);
    }

    sendMessage(msg, params, cb) {
        this.socket.emit(msg, params, cb);
    }

    _write(chunk, encoding, cb) {
        this.socket.emit('data', chunk);
        cb();
    }

}



module.exports.ChannelConnection = ChannelConnection;
