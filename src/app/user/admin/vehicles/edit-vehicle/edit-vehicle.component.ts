import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService, NotificationService, LangService, VehicleTypesService, LocationsService } from '../../../../shared';
import { VehicleType,Location } from '../../../../models';

@Component({
  selector: 'nb-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  form: FormGroup;

  isBusy: boolean;
  submitAttempt: boolean = false;
  id: number;

  vehicle: any;
  departments: any;

  // locations: Location[];

  locations: any = [];
  
  vehicleTypes: VehicleType[];

  constructor(
    private _router: Router,
    public formBuilder: FormBuilder,
    private _service: VehiclesService,
    private _route: ActivatedRoute,    
    private notificationService: NotificationService,
    private lang: LangService,
    private locationsService: LocationsService,
    private vehicleTypesService: VehicleTypesService,
  ) {
    this.initForm();
    this.isBusy = false;
  }

  ngOnInit() {

    
    this.vehicleTypes = this.vehicleTypesService.getAll();

    console.log(this.vehicleTypes);
    this.getLocations();

    this._route.params.subscribe(params => {
      this.id = params["id"]; // --> Name must match wanted parameter
      console.log(this.id);
    });
    this.getDetailsById(this.id);
  }

  getLocations() {   
      this.locationsService.list()
        .subscribe(
          data => {
            this.locations = data['result']['info'];

            console.log(this.locations);
          },
          error => { }
        );    
  }

  getDetailsById(id) {
    this._service.edit(id).subscribe(
      res => {
        this.vehicle = res["result"]["info"]["lists"];
        this.loadForm();
        console.log(res);
      },
      err => {}
    );
  }

  submit(form) {
    const id = this.vehicle.id;
    this.submitAttempt = true;

    console.log(form.value);

    if (form.valid) {
      this._service.update(form.value, id).subscribe(
        res => {
          console.log(res["result"]);
          this._router.navigate(["/me/admin/manage-vehicle"]);
        },
        err => {
          if (err.status === 404) {
            // this._commonProvider.showToaster(JSON.parse(err._body).invalid);
          } else {
            // this._commonProvider.showToaster("Try again later");
          }
        }
      );
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      manufacturer: new FormControl("", Validators.required),
      model: new FormControl("", Validators.required),
      vehicle_id: new FormControl("", Validators.required),
      tracker_id: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required)
    });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      manufacturer: new FormControl(this.vehicle.manufacturer, Validators.required),
      model: new FormControl(this.vehicle.model, Validators.required),
      vehicle_id: new FormControl(this.vehicle.vehicle_id, Validators.required),
      tracker_id: new FormControl(this.vehicle.tracker_id, Validators.required),
      type: new FormControl(this.vehicle.type, Validators.required),
      location: new FormControl(this.vehicle.location, Validators.required)
    });
  }

  cancel() {
    this._router.navigate(["/me/admin/manage-vehicle"]);
  }
}
