import {NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingMogule} from './auth-routing.mogule';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingMogule,
    SharedModule
  ]
})

export class AuthModule {

}
