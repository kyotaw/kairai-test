'use strict';

const channelRepository = {

    channels: {},

    async create(channel) {
        this.channels[channel.channelId] = channel;
    },

    async delete(channel) {
        delete this.channels[channel.channelId];
    },

    async get(channelId) {
        if (this.channels[channelId]) {
            return this.channels[channelId];
        }
        return null;
    },
}

module.exports = channelRepository;
