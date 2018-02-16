import { Sensor } from './sensor.model';
import { SensorType } from './sensor-types.model';
import { ProductId } from './product-id.model';
import { Location } from './location.model';

export class BarometerSpec {
    
    constructor(
        public readonly linearity: number,
        public readonly hysteresis: number,
        public readonly repeatability: number,
        public readonly calibrationUncertainty: number,
        public readonly accuracy: number) {
    }
}

export class Barometer extends Sensor {

    constructor(
        productId: ProductId,
        name: string,
        location: Location,
        status: string,
        public readonly spec: BarometerSpec) {

        super(SensorType.barometer, productId, name, location, status);
    }
}
