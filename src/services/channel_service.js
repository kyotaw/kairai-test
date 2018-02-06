'use strict';

const ChannelHost = require('../models/channel_host').ChannelHost
    , ChannelListener = require('../models/channel_listener').ChannelListener
    , Channel = require('../models/channel').Channel
    , ChannelStates = require('../models/channel_status').ChannelStates
    , channelRepository = require('../models/channel_repository')
    , dataSourceRepository = require('../models/data_source_repository')
    , Geo = require('../models/geo').Geo
    , errors = require('../errors');

const channelService = {
    
    async openChannel(conn) {
        const dataSource = await dataSourceRepository.getByHash(conn.query.dataSourceHash);
        if (!dataSource) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }

        let channel = await channelRepository.get(dataSource.productId.hash);
        if (channel && channel.status.isOffline) {
            await channelRepository.delete(channel);
            channel = null;
        }
        if (channel) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_ALREADY_OPEN);
        }

        let host = new ChannelHost(dataSource, conn);
        channel = new Channel(host);
        await channelRepository.create(channel);
        return channel;
    },

    async addDirectListener(conn) {
        const dataSource = await dataSourceRepository.getByHash(conn.query.dataSourceHash);
        if (!dataSource) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }

        let channel = await channelRepository.get(dataSource.productId.hash);
        if (channel && channel.status.isOffline) {
            await channelRepository.delete(channel);
            channel = null;
        }
        if (!channel) {
            throw new errors.KairaiError(errors.ErrorTypes.CHANNEL_NOT_OPEN);
        }

        channel.addListener(conn);
        if (channel.status.isReady) {
            await channel.start();
        }
        return channel;
    },

    async addAggregationListener(conn) {
        const dataSources = await Geo.getDataSourcesInside(conn.query.area, conn.query.dataSourceType);
        if (dataSource.lenght === 0) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }
    },

    async getChannel(channelId) {
        return await channelRepository.get(channelId);
    },

}

module.exports = channelService;
