import { Channel } from './channel.model';

export class ChannelFactory {

    constructor() {}

    public static create(data: any): Channel {
        return new Channel(
            data['host'],
            data['listners'],
            data['state']);
    }
}
