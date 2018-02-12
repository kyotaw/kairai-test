'use strict';

const ChannelAggregation = require('./channel_aggregation').ChannelAggregation
    , average = require('../helpers/statistics').average
    , timestamp = require('../helpers/time').timestamp;

class ChannelAverage extends ChannelAggregation {

    _aggregate(dataArray) {
        if (dataArray.length === 0) {
            return null;
        }
        const values = dataArray.map(d => { return d.toArray(); });
        const ave = average(values);
        let aveData = new dataArray[0].constructor(ave);
        aveData.timestamp = timestamp();
        aveData.samples = dataArray.length;
        return aveData;
    }
}

module.exports.ChannelAverage = ChannelAverage;
