import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  UsersService,
  DepartmentsService,
  NotificationService,
  LangService
} from "../../../../shared";

@Component({
  selector: "nb-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  isBusy: boolean;
  submitAttempt: boolean = false;

  departments: any;

  constructor(
    private _router: Router,
    public formBuilder: FormBuilder,
    private _service: UsersService,
    private departmentsService: DepartmentsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.initForm();
    this.isBusy = false;
  }

  ngOnInit() {
    this.getDepartment();
  }

  getDepartment() {
    this.departmentsService.getAll().subscribe(
      data => {
        this.departments = data["result"]["info"];
      },
      error => {
        this.notificationService.notifyError(
          this.lang.get("err_failed_fetching_departments")
        );
      }
    );
  }

  submit(form) {
    console.log(form);
    console.log(form.value);
    console.log(form.valid);
    this.submitAttempt = true;

    if (form.valid) {
      this._service.create(form.value).subscribe(
        res => {
          console.log(res["result"]);
          this._router.navigate(["/me/admin/manage-user"]);
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
      initials: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$")
        ])
      ),
      department: new FormControl("", Validators.required),
      job_title: new FormControl("", Validators.required)
    });
  }

  isFormControlDirty(controlName: string): boolean {
    if (!this.form) {
      return false;
    }

    const form = this.form;
    const control = form.get(controlName);

    return control && control.dirty;
  }

  isFormControlValid(controlName: string): boolean {
    if (!this.form) {
      return false;
    }

    const form = this.form;
    const control = form.get(controlName);

    return control && control.valid;
  }

  cancel(){
    this._router.navigate(['/me/admin/manage-user']);
  }
}
