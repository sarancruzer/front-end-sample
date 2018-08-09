import { LocalAdmin } from './../../../models/local-admin';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalAdminService } from '../../../shared/services/local-admin.service';

@Component({
  selector: 'nb-edit-local-admin',
  templateUrl: './edit-local-admin.component.html',
  styleUrls: ['./edit-local-admin.component.css'],
  providers: [LocalAdminService]
})
export class EditLocalAdminComponent implements OnInit {

  form: FormGroup;

  isBusy: boolean;
  submitAttempt: boolean = false;
  id:number;

  localAdmin: LocalAdmin;

  constructor(private _router: Router, public formBuilder: FormBuilder,private _service: LocalAdminService,private _route : ActivatedRoute) {
    this.initForm();
    this.isBusy = false;
   }

  ngOnInit() {

    this._route.params.subscribe(params => {
      this.id = params['id']; // --> Name must match wanted parameter
      console.log(this.id);
    });
    this.getDetailsById(this.id);
   
  }

  getDetailsById(id) {
    this._service.edit(id).subscribe(     
      (res) => {
           this.localAdmin = res['result']['info']['lists'];
           this.loadForm();
           console.log(res);
      },
    (err) => { 
      
    }) 
  }

  submit(form) {

    const id = this.localAdmin.id;
    this.submitAttempt = true;

    console.log(form.value);

    if (form.valid) {
      this._service.update(form.value,id)
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

  loadForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.localAdmin.name, Validators.required),
      email: new FormControl(this.localAdmin.email, Validators.required),
      phone: new FormControl(this.localAdmin.phone, Validators.required),
      job_title: new FormControl(this.localAdmin.job_title, Validators.required)
    });  
  }


}