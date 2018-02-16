import { Sensor } from './sensor.model';
import { SensorType } from './sensor-types.model';
import { ProductId } from './product-id.model';
import { Location } from './location.model';

export class PositioningSystemSpec {

    constructor(
        public readonly methods: string[],
        public readonly maxAccuracy: number) {
    }

}

export class PositioningSystem extends Sensor {
    
    constructor(
        productId: ProductId,
        name: string,
        location: Location,
        status: string,
        public readonly spec: PositioningSystemSpec) {
        super(SensorType.positioningSystem, productId, name, location, status);
    }
}
