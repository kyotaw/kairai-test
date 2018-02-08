'use strict';

const isArray = require('../helpers/array').isArray;

const channelRepository = {

    channels: {},

    async create(channel) {
        this.channels[channel.id] = channel;
    },

    async delete(channel) {
        delete this.channels[channel.id];
    },

    async get(channelIds) {
        if (isArray(channelIds)) {
            let channels = [];
            for (let id of channelIds) {
                const channel = await this_get(id);
                if (channel) {
                    channels.push(channel);
                }
            }
            return channels;
        } else {
            return await this._get(channelIds);
        }
    },

    async _get(channelId) {
        if (this.channels[channelId]) {
            return this.channels[channelId];
        }
        return null;
    }
}

module.exports = channelRepository;
