import { Sensor } from './sensor.model';
import { SensorType } from './sensor-types.model';
import { ProductId } from './product-id.model';
import { Location } from './location.model';

export class CameraSpec {
    
    constructor(
        public readonly totalPixels: number,
        public readonly effectivePixels: number,
        public readonly colorSpaces: string[]) {
    }
}

export class Camera extends Sensor {

    constructor(
        productId: ProductId,
        name: string,
        location: Location,
        status: string,
        public readonly spec: CameraSpec) {

        super(SensorType.camera, productId, name, location, status);
    }
}
