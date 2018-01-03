import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { passwordMatcher } from './password-matcher';

@Component({
  selector: 'nb-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();

  changePasswordForm: FormGroup;
  user: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.pattern('[0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+')])],
      confirmPassword: ['', Validators.required],
    },
    {
        validator: passwordMatcher('password', 'confirmPassword')
    });
  }

  onSubmit() {
    const password: string = this.changePasswordForm.value.password;
    this.changePasswordForm.reset();
    this.done.emit(password);
  }

}
