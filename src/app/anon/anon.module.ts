import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnonRoutingModule } from './anon-routing.module';
import { NbSharedModule } from '../shared/nb-shared.module';

import { AnonComponent } from './anon.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from '../shared/services';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnonRoutingModule,
    NbSharedModule
  ],
  declarations: [
    AnonComponent,
    LoginComponent,
    FooterComponent,
    ForgetPasswordComponent
  ],
  providers: [AuthenticationService]
})
export class AnonModule { }
