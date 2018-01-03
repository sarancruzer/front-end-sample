import { BookVehicleStepButton } from './book-vehicle-step-button';

export interface BookVehicleStep {
    name: string;
    id: string;
    buttons?: BookVehicleStepButton[];
}
