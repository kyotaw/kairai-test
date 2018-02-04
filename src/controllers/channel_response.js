'use strict';

function channelStateResponse(channel) {
    if (!channel) {
        return {
            'state': 'offline'
        }
    } else {
        return channel.toDict();
    }
}

module.exports = {
    channelStateResponse: channelStateResponse,
}
