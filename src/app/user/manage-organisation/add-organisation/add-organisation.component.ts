import { Organisation } from './../../../models/organisation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganisationService } from '../../../shared';

@Component({
  selector: 'nb-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

  form: FormGroup;

  submitAttempt: boolean = false;

  organisation: Organisation;

  constructor(private _router: Router, public formBuilder: FormBuilder,private _service: OrganisationService) {

    this.initForm();

   }

  ngOnInit() {
   
  }

  submit(form) {

    this.submitAttempt = true;

    if (form.valid) {
      this.organisation = form.value;

      this._service.create(this.organisation)
        .subscribe(
          res => {
            console.log(res['result']);    
            this._router.navigate(['/me/manage-organisation']);     
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
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      website: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      postal_code: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      no_of_employees: new FormControl("", Validators.required),
      
    });

  }

  manageOrganisation()
  {
    this._router.navigate(['/me/manage-organisation']);
  }


}