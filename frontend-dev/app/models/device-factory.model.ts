import { Device } from './device.model';
import { Sensor } from './sensor.model';
import { ProductId } from './product-id.model';
import { SensorFactory } from '../models/sensor-factory.model';

export class DeviceFactory {

    public static create(data: any): Device {
        const productId = new ProductId(
            data['modelNumber'],
            data['serialNumber'],
            data['vendorName'],
            data['hash']);
        const name = data['name'];
        let sensors: Sensor[] = [];
        for (let ds of data['dataSources']) {
            const sensor = SensorFactory.create(ds);
            if (sensor) {
                sensors.push(sensor);
            }
        }
        return new Device(productId, name, sensors);
    }
}
