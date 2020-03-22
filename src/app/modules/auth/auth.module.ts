import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterBoothComponent } from './register-booth/register-booth.component';
import { RegisterFarmerComponent } from './register-farmer/register-farmer.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RegisterBoothComponent,
        RegisterFarmerComponent,
        RegisterSellerComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class AuthModule { }
