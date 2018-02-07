'use strict';

const Channel = require('../models/channel').Channel
    , ChannelPipelineBuilder = require('../models/channel_host').ChannelHost
    , ChannelStates = require('../models/channel_status').ChannelStates
    , channelRepository = require('../models/channel_repository')
    , GeoLocation = require('../models/geo_location').GeoLocation
    , dataSourceRepository = require('../models/data_source_repository')
    , Geo = require('../models/geo').Geo
    , errors = require('../errors');

const channelService = {
    
    async openChannel(conn) {
        const dataSource = await dataSourceRepository.getByHash(conn.query.dataSourceHash);
        if (!dataSource) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_NOT_FOUND);
        }
        if (conn.query.location) {
            dataSource.location = new GeoLocation(conn.query.location.latitude, conn.query.location.longitude);
            await dataSourceRepository.update(dataSource);
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

        let builder = new ChannelPipelineBuilder();
        builder.addSources(channel);
        builder.setListener(conn);
        channel = bulder.build();

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
