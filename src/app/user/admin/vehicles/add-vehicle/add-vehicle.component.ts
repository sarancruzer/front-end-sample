import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiclesService, NotificationService, LangService, LocationsService, VehicleTypesService } from '../../../../shared';
import { VehicleType } from '../../../../models';

@Component({
  selector: 'nb-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

 
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


  submit(form) {
    this.submitAttempt = true;
    console.log(form.value);

    if (form.valid) {
      this._service.create(form.value).subscribe(
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


  cancel() {
    this._router.navigate(["/me/admin/manage-vehicle"]);
  }
}
