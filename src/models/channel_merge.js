'use strict';

class ChannelMerge {

    constructor(sources, listener) {
        this.sources = sources;
        this.listener = listener;
    }

    onListenerDisconnect(listener) {
        for (let source of this.sources) {
            source.onListenerDisconnect(listener);
        }
    }

    disconnect() {
        this.listener.disconnect();
    }

    recieve(data, host) {
        this.listener.recieve(data, host);
    }
}
