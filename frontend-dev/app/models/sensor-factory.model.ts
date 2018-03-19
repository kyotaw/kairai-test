import { Sensor } from './sensor.model';
import { ProductId } from './product-id.model';
import { SensorStatus } from './sensor-status.model';
import { Location } from './location.model';
import { Accelerometer, AccelerometerSpec } from './accelerometer.model';
import { Camera, CameraSpec } from './camera.model';
import { Barometer, BarometerSpec } from './barometer.model';
import { PositioningSystem, PositioningSystemSpec } from './positioning-system.model';
import { BrainWaveSensor, BrainWaveSensorSpec} from './brainwave-sensor.model';

const sensors = {
    accelerometer(productId: ProductId, name: string, status: SensorStatus, location: Location, data: any) {
        const spec = new AccelerometerSpec(
            data['axis'],
            data['gRanges'],
            data['sensitivities'],
            data['noiseRange'],
            data['resolutions']);
        return new Accelerometer(productId, name, location, status, spec);
    },

    camera(productId: ProductId, name: string, status: SensorStatus, location: Location, data: any) {
        const spec = new CameraSpec(
            data['totalPixels'],
            data['effectivePixels'],
            data['colorSpaces']);
        return new Camera(productId, name, location, status, spec);
    },

    barometer(productId: ProductId, name: string, status: SensorStatus, location: Location, data: any) {
        const spec = new BarometerSpec(
            data['linearity'],
            data['hysteresis'],
            data['repeatability'],
            data['calibrationUncertainty'],
            data['accuracy']);
        return new Barometer(productId, name, location, status, spec);
    },

    positioningSystem(productId: ProductId, name: string, status: SensorStatus, location: Location, data: any) {
        const spec = new PositioningSystemSpec(
            data['methods'],
            data['maxAccuracy']);
        return new PositioningSystem(productId, name, location, status, spec);
    },

    brainwaveSensor(productId: ProductId, name: string, status: SensorStatus, location: Location, data: any) {
        const spec = new BrainWaveSensorSpec(data['channels_10_20'], data['channels']);
        return new BrainWaveSensor(productId, name, location, status, spec);
    },
}

export class SensorFactory {

    public static create(data: any): Sensor {
        const type = data['sourceType'];
        if (!sensors[type]) {
            return null;
        }
        const productId = new ProductId(
            data['modelNumber'],
            data['serialNumber'],
            data['vendorName'],
            data['hash']);
        const name = data['name'];
        const status = SensorStatus[data['status']];
        const locParams = data['location'];
        const location = locParams ? new Location(locParams['latitude'], locParams['longitude']) : null;

        return sensors[type](productId, name, status, location, data['spec']);
    }
}
