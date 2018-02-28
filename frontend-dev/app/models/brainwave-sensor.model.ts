import { Sensor } from './sensor.model';
import { SensorType } from './sensor-types.model';
import { ProductId } from './product-id.model';
import { Location } from './location.model';

export class BrainWaveSensorSpec {

    constructor(
        public readonly channels_10_20: string[],
        public readonly channels: number) {
    }
}


export class BrainWaveSensor extends Sensor {

    constructor(
        productId: ProductId,
        name: string,
        location: Location,
        status: string,
        public readonly spec: BrainWaveSensorSpec) {
        super(SensorType.brainwaveSensor, productId, name, location, status);
    }
}
