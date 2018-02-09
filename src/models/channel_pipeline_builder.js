'use strict';

const array = require('../helpers/array')
    , ChannelListener = require('./channel_listener').ChannelListener
    , ChannelAggregation = require('./channel_aggregation').ChannelAggregation
    , errors = require('../errors');

class ChannelPipelineBuilder {
   
    constructor() {
        this.sources = [];
        this.isAggregation = false;
        this.methods = [];
        this.listher = null;
    }

    addSources(sourceChannels) {
        if (!array.isArray(sourceChannels)) {
            sourceChannels = [sourceChannels];
        }
        this.sources = this.sources.concat(sourceChannels);
    }

    setAggregation(isAggr) {
        this.isAggregation = isAggr;
    }

    addMethod(method) {
        this.methods.push(method);
    }

    setListener(listener) {
        this.listener = listener;
    }

    build() {
        if (this.sources.length === 0 || !this.listener) {
            throw new errors.KairaiError(errors.ErrorTypes.INVALID_PARAMETERS);
        }

        if (this.isAggregation) {
            // aggregation api
            const listener = new ChannelListener(this.listener);
            const aggregation = new ChannelAggregation(this.sources, listener);
            listener.setSource(aggregation);
            for (let source of this.sources) {
                source.addListener(aggregation);
            }
            return this.sources;
        } else {
            // direct api
            if (this.sources.length !== 1) {
                throw new errors.KairaiError(errors.ErrorTypes.INVALID_PARAMETERS);
            }
            let listener = new ChannelListener(this.listener);
            listener.setSource(this.sources[0]);
            this.sources[0].addListener(listener);
            return this.sources[0];
        }
    }
}

module.exports.ChannelPipelineBuilder = ChannelPipelineBuilder;
