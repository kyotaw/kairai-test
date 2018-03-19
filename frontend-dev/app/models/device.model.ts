import { Sensor } from './sensor.model';
import { ProductId } from './product-id.model';

export class Device {

    constructor(
        public readonly productId: ProductId,
        public readonly name: string,
        public readonly sensors: Sensor[]) {
    }
}
