import { Sensor } from './sensor.model';
import { SensorType } from './sensor-types.model';
import { ProductId } from './product-id.model';
import { Location } from './location.model';

export class AccelerometerSpec {

    constructor(
        public readonly axis: number,
        public readonly gRanges: number[],
        public readonly sensitivities: number[],
        public readonly noiseRange: [number, number],
        public readonly resolutions: number[]) {
    }
}


export class Accelerometer extends Sensor {
    
    constructor(
        productId: ProductId,
        name: string,
        location: Location,
        status: string,
        public readonly spec: AccelerometerSpec) {
        super(SensorType.accelerometer, productId, name, location, status);
    }
}

