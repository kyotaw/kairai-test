'use strict';

const ChannelStates = {
    OFFLINE: 'offline',
    READY: 'ready',
    ACTIVE: 'active',
    UNAVAILABLE: 'unavailable'
}

class ChannelMemberStatus {

    constructor() {
        this._state = ChannelStates.OFFLINE;
    }
    
    get state() { return this._state; }
    set state(state) { this._state = state; }
    
    get isOffline() { return this._state === ChannelStates.OFFLINE; }
    get isReady() { return this._state === ChannelStates.READY; }
    get isActive() { return this._state === ChannelStates.ACTIVE; }
    get isUnavailable() { return this._state === ChannelStates.UNAVAILABLE; }
}

module.exports = {
    ChannelStates: ChannelStates,
    ChannelMemberStatus: ChannelMemberStatus,
}
