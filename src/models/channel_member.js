'use strict';

const ChannelMemberStatus = require('./channel_status.js').ChannelMemberStatus
    , ChannelStates = require('./channel_status.js').ChannelStates;

class ChannelMember {

    constructor(channelId) {
        this.channelId = channelId;
        this.status = new ChannelMemberStatus();
        this._channel = null;
    }

    get channel() { return this._channel; }
    set channel(channel) {
        this.status.state = channel ? ChannelStates.READY : ChannelStates.OFFLINE;
        this._channel = channel;
    }
}

module.exports.ChannelMember = ChannelMember;
