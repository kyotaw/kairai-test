'use strict';

class ChannelAggregation {

    constructor(sources, listener) {
        this.sources = sources;
        this.listener = listener;
        this.valueMap = new Map();
    }

    onListenerDisconnect(listener) {
        for (let source of this.sources) {
            source.onListenerDisconnect(this);
        }
    }

    removeSource(source) {
        this.sources.some((val, i) => {
            if (val === source) {
                this.sources.splice(i, 1);
                this.valueMap.delete(source.id);
            }
        });
        if (this.sources.length === 0) {
            this.listener.removeSource(this);
        }
    }

    disconnect() {
        this.listener.disconnect();
    }

    recieve(data, source) {
        this.valueMap.set(source.id, data);
        if (this.valueMap.size === this.sources.length) {
            let values = [];
            for (let [key, data] of this.valueMap) {
                values.push(data);
            }
            this.listener.recieve(values, this);
        }
    }
}

module.exports.ChannelAggregation = ChannelAggregation;
