'use strict';

const ChannelMemberStatus = require('./channel_status.js').ChannelMemberStatus
    , ChannelStates = require('./channel_status.js').ChannelStates;

class ChannelMember {

    constructor() {
        this.status = new ChannelMemberStatus();
        this._source = null;
    }

    get source() {
        return this._source;
    }

    set source(source) {
        this.status.state = source ? ChannelStates.READY : ChannelStates.OFFLINE;
        this._source = source;
    }
}

module.exports.ChannelMember = ChannelMember;
