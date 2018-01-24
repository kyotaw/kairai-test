'use strict';

const ChannelHost = require('../models/channel_host').ChannelHost
    , ChannelListener = require('../models/channel_listener').ChannelListener
    , channelRepository = require('../models/channel_repository')
    , errors = require('../errors');

const channelService = {
    
    async openChannel(dataSource, socket) {
        if (await channelRepository.get(dataSource.productId.hash)) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_ALREADY_OPEN);
        }
        const host = new ChannelHost(dataSource, socket);
        channelRepository.create(host);
        return host;
    },

    async addListener(dataSource, listenerSocket) {
        let channelHost = await channelRepository.get(dataSource.productId.hash);
        if (!channelHost) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_NOT_OPEN);
        }
        channelHost.addListener(listenerSocket);
    }
}

module.exports = channelService;
