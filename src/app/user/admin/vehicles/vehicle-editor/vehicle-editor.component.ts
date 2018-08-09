import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { Vehicle, Location } from './../../../../models';
import {
  SessionService,
  VehiclesService,
  NotificationService,
  LangService,
} from './../../../../shared/services';
import ModelToJsonTransformers from './../../../../utils/model.to.json';

@Component({
  selector: 'nb-vehicle-editor',
  templateUrl: './vehicle-editor.component.html',
  styleUrls: ['./vehicle-editor.component.css']
})
export class VehicleEditorComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() vehicle: Vehicle;

  @Input() visible: boolean;

  @Output() shown: EventEmitter<boolean>;

  @Output() hidden: EventEmitter<boolean>;

  @Output() update: EventEmitter<Vehicle>;

  imgPath: string;

  isBusy: boolean = false;

  slideToggle: boolean;
  forms = {
    imageUpload: true,
    vehicleEdit: false
  };

  imageButtonText: string;

  buttonText: string;

  private modal: any;
  private vehicleImageData: File;

  constructor(
    private sessionService: SessionService,
    private vehicleService: VehiclesService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.visible = false;
    this.slideToggle = false;
    this.shown = new EventEmitter<boolean>();
    this.hidden = new EventEmitter<boolean>();
    this.update = new EventEmitter<Vehicle>();
    this.imgPath = '';
  }

  setBTAsUpdate() {
    this.buttonText = this.lang.get('btn_update');
  }

  setBTAsCreate() {
    this.buttonText = this.lang.get('btn_create');
  }

  ngOnInit() {
    let modal = jQuery('#vehicleEditor');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
      this.modal.on('shown.bs.modal', () => this.shown.emit(true));
      this.modal.on('hidden.bs.modal', () => this.hidden.emit(true));
    }

  }

  ngOnChanges() {
    // toggle modal visibility
    if (this.visible) {
      this.show();
    } else {
      this.hide();
      this.resetForms();
    }

    // reset vehicle
    if (!this.vehicle) {
      this.vehicle = this.createVehicle();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
    this.buttonText = this.lang.get('btn_create');
    this.imageButtonText = this.lang.get('btn_skip');
    })
  }

  show() {
    if (!this.modal) {
      return;
    }

    this.modal.modal({
      show: true,
      backdrop: 'static'
    });
  }

  hide() {
    if (!this.modal) {
      return;
    }

    this.modal.modal('hide');
  }

  onVehicleFormDone(event: Vehicle) {
    let vehicle: Vehicle = event;
    this.isBusy = true;
    if (!vehicle.key) {

      this.vehicleService.create(vehicle).subscribe(
        data => {
          this.isBusy = false;
          vehicle.key = data.vehicle_key;
          vehicle.location = (typeof vehicle.location === 'string') ? vehicle.location : vehicle.location.name;

          // call image upload service
          let uploadUrl: string = data.upload_url;
          let vehicleKey: string = data.vehicle_key;
          if (this.vehicleImageData) {
            this.uploadImage(vehicleKey, uploadUrl);
          }

          this.update.emit(vehicle);
          this.hide();
        },
        err => {
          this.notificationService.notifyError(this.lang.get('err_create_vehicle'));
          this.resetForms();
        }
      );
    } else if (vehicle.key) {
      this.vehicleService.update(vehicle,1).subscribe(
        data => {
          this.isBusy = false;
          vehicle.location = (typeof vehicle.location === 'string') ? vehicle.location : vehicle.location.name;

          // call image upload service
          let uploadUrl: string = data.upload_url;
          if (this.vehicleImageData) {
            this.uploadImage(vehicle.key, uploadUrl, vehicle);
          }
          this.update.emit(vehicle);
          this.hide();
        },
        err => {
          this.notificationService.notifyError(this.lang.get('err_update_vehicle'));
          this.hide();
        }
      );
    }
  }

  // uploading image to the server
  uploadImage(vehicleKey: string, uploadUrl: string, vehicle?) {
    this.vehicleService.uploadImage(this.vehicleImageData, vehicleKey, uploadUrl).subscribe(
      data => {
        if (vehicle) {
          vehicle.image = data.image || '';
         this.update.emit(vehicle);
        }
          this.hide();
      },
      err => {
        if (vehicle) {
         this.update.emit(vehicle);
        }
          this.hide();
          this.notificationService.notifyError(this.lang.get('err_upload_vehicle_img'));
      }

    );
  }

  // sets the image data before upload
  fileChange(event) {
    let fileList: FileList = event.target.files;
    let file: File;
    if (fileList && fileList.length > 0) {
      file = fileList[0];
      this.vehicleImageData = file;
      this.imageButtonText = 'Save';
    }

    let reader  = new FileReader();

    reader.onloadend =  () => {
      this.imgPath = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.imgPath = '';
    }
  }

  openVehicleEditForm() {
    this.forms.imageUpload = false;
    this.forms.vehicleEdit = true;
  }

  // set default value
  resetForms() {
    this.forms.imageUpload = true;
    this.forms.vehicleEdit = false;
    this.imageButtonText = this.lang.get('btn_skip');
    this.vehicleImageData = null;
  }

  private createVehicle(): Vehicle {
    return {
      key: null,
      image: null,
      vehicleId: null,
      trackerId: null,
      type: null,
      manufacturer: null,
      location: null,
      model: null,
      isAvailable: true
    };
  }

}
