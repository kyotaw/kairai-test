'use strict';

const Writable = require('stream').Writable
    , env = require('../env')
    , timestamp = require('../helpers/time').timestamp;

class ChannelValve extends Writable {

    constructor(conn) {
        super({
            highWaterMark: 128,
            objectMode: true
        });
        this.conn = conn;
        this.fps = conn.query.fps || 64;
        if (this.fps > env.channel['maxFps']) {
            this.fps = env.channel['maxFps'];
        }
        this.interval = 1 / this.fps * 1000;
        this.prev_timeout = timestamp();
    }

    sendData(data) {
        this.write(data);
    }
    
    _write(chunk, encoding, cb) {
        const now = timestamp();
        let delay = this.interval - (now - this.prev_timeout);
        if (delay > 0) {
            delay = delay < 1.0 ? 1.0 : delay;
            setTimeout((data) => {
                this.conn.sendData(data);
                this.prev_timeout = timestamp();
                cb();
            },
            delay,
            chunk);
        } else {
            this.conn.sendData(chunk);
            this.prev_timeout = now;
            cb();
        }
    }
}

module.exports.ChannelValve = ChannelValve;
