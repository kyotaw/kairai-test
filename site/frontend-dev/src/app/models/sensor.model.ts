import { ProductId } from './product-id.model';
import { SensorType } from './sensor-types.model';
import { SensorStatus } from './sensor-status.model';

export class Sensor {

    public readonly type: SensorType;

    constructor(public readonly productId: ProductId, public readonly name: string, public readonly status: string) {
        this.type = SensorType.unknownSensor;
    }
}
