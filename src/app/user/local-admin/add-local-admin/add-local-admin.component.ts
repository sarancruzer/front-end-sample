import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';import { LocalAdminService } from '../../../shared/services/local-admin.service';


@Component({
  selector: 'nb-add-local-admin',
  templateUrl: './add-local-admin.component.html',
  styleUrls: ['./add-local-admin.component.css'],
  providers: [LocalAdminService]
})
export class AddLocalAdminComponent implements OnInit {

  form: FormGroup;

  isBusy: boolean;
  submitAttempt: boolean = false;

  constructor(private _router: Router, public formBuilder: FormBuilder,private _service: LocalAdminService) {
    this.initForm();
    this.isBusy = false;
   }

  ngOnInit() {
   
  }

  submit(form) {

    this.submitAttempt = true;

    if (form.valid) {
      this._service.create(form.value)
        .subscribe(
          res => {
            console.log(res['result']);    
            this._router.navigate(['/me/admin/manage-local-admin']);     
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
      phone: new FormControl("", Validators.required),
      job_title: new FormControl("", Validators.required)
    });

   
  }


}