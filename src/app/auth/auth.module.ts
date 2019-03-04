import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
