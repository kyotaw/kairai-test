import { ProductId } from './product_id.model';
import { SensorType } from './sensor_types.model';
import { SensorStatus } from './sensor_status.model';

export class Sensor {

    public readonly _type: SensorType;
    private _status: SensorStatus;

    constructor(public readonly productId: ProductId) {
    }

}
