import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnonComponent } from './anon.component';
import { LoginComponent } from './login/login.component';

const anonRoutes: Routes = [
  {
    path: '',
    component: AnonComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(anonRoutes)],
  exports: [RouterModule]
})
export class AnonRoutingModule { }
