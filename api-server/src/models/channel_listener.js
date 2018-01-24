'use strict';

const ChannelMember = require('./channel_member').ChannelMember;

class ChannelListener extends ChannelMember {

    constructor(dataSource, socket) {
        super(dataSource, socket);
    }
}

module.exports.ChannelListener = ChannelListener;
