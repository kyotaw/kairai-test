'use strict';

const array = require('../helpers/array');

const 


class ChannelPipelineBuilder {
   
    constructor() {
        this.sources = [];
        this.methods = [];
        this.listher = null;
    }

    addSources(sourceChannels) {
        if (!array.isArray(sourceChannels)) {
            sourceChannels = [sourceChannels];
        }
        this.sources = this.sources.concat(sourceChannels);
    }

    addMethids(method) {
        this.methods.push(method);
    }

    setListener(listener) {
        this.listener = listener;
    }

    build() {
        
    }
}
