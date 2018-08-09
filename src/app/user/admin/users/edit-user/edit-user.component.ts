import { UsersService } from "./../../../../shared/services/users.service";
import { User } from "./../../../../models/user";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  DepartmentsService,
  NotificationService,
  LangService
} from "../../../../shared";

@Component({
  selector: "nb-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  form: FormGroup;

  isBusy: boolean;
  submitAttempt: boolean = false;
  id: number;

  user: any;
  departments: any;

  constructor(
    private _router: Router,
    public formBuilder: FormBuilder,
    private _service: UsersService,
    private _route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.initForm();
    this.isBusy = false;
  }

  ngOnInit() {
    this.getDepartment();

    this._route.params.subscribe(params => {
      this.id = params["id"]; // --> Name must match wanted parameter
      console.log(this.id);
    });
    this.getDetailsById(this.id);
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

  getDetailsById(id) {
    this._service.edit(id).subscribe(
      res => {
        this.user = res["result"]["info"]["lists"];
        this.loadForm();
        console.log(res);
      },
      err => {}
    );
  }

  submit(form) {
    const id = this.user.id;
    this.submitAttempt = true;

    console.log(form.value);

    if (form.valid) {
      this._service.update(form.value, id).subscribe(
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
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      job_title: new FormControl("", Validators.required),
      initials: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required)
    });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      phone: new FormControl(this.user.phone, Validators.required),
      job_title: new FormControl(this.user.job_title, Validators.required),
      initials: new FormControl(this.user.initials, Validators.required),
      department: new FormControl(this.user.department, Validators.required)
    });
  }

  cancel() {
    this._router.navigate(["/me/admin/manage-user"]);
  }
}
