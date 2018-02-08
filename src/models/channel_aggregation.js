'use strict';

class ChannelAggregation {

    constructor(sources, listener) {
        this.sources = sources;
        this.listener = listener;
        listener.source = this;
        this.valueMap = new Map();
    }

    onListenerDisconnect(listener) {
        for (let source of this.sources) {
            source.onListenerDisconnect(listener);
        }
    }

    disconnect() {
        this.listener.disconnect();
    }

    recieve(data, source) {
        this.valueMap.set(source.id, data);
        if (this.valueMap.size === this.sources.length) {
            values = [];
            for (let [key, data] of this.valueMap) {
                values.push(data.plainValue);
            }
            this.listener.recieve(values, this);
        }
    }
}

module.exports.ChannelAggregation = ChannelAggregation;
