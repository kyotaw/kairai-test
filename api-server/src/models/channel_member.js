'use strict';

class ChannelMember {

    constructor(dataSource, socket) {
        this.dataSource = dataSource;
        this.socket = socket;
        this.socket.join(dataSource.hash);
    }

    get channelId() { return this.dataSource.productId.hash; }
}

module.exports.ChannelMember = ChannelMember;
