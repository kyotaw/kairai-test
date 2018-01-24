'use strict';

const channelRepository = {

    channels: {},

    async create(channelHost) {
        this.channels[channelHost.channelId] = channelHost;
    },

    async get(channelId) {
        if (this.channels[channelId]) {
            return this.channels[channelId];
        }
        return null;
    }
}

module.exports = channelRepository;
