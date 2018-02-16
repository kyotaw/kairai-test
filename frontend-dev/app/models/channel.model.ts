export class Channel {
    
    constructor(
        public readonly host: string,
        public readonly listeners: string[],
        public readonly status: string) {
    }

}
