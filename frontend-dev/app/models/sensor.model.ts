import { ProductId } from './product-id.model';
import { SensorType } from './sensor-types.model';
import { SensorStatus } from './sensor-status.model';
import { Location } from './location.model';

export class Sensor {

    constructor(
        public readonly type: SensorType,
        public readonly productId: ProductId,
        public readonly name: string,
        public readonly location: Location,
        private _status: string)
    {
    }

    get status() {
        return this._status;
    }

    set status(newValue) {
        this._status = newValue;
    }

    get isActive() {
        return this.status === SensorStatus.active;
    }

    get isReady() {
        return this.status === SensorStatus.ready;
    }

    get isOffline() {
        return this.status === SensorStatus.offline;
    }
}
