import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AnonModule } from './anon/anon.module';
import { UserModule } from './user/user.module';

import { OrganisationService, SessionService } from './shared/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AnonModule,
    UserModule
  ],
  providers: [OrganisationService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
