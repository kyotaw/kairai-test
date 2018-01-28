import { Sensor } from './sensor.model';
import { ProductId } from './product-id.model';
import { SensorStatus } from './sensor-status.model';

export class SensorFactory {

    public static create(json): Sensor {
        const productId = new ProductId(
            json['modelNumber'],
            json['serialNumber'],
            json['vendorName'],
            json['hash']);
        return new Sensor(productId, json['name'], SensorStatus[json['status']]);
    }
}
