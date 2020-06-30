import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {AuthPageRoutingModule} from './auth-routing.module';

import {LoginPage} from './login/login.page';
import {RegisterPage} from './register/register.page';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        ComponentsModule
    ],
    declarations:
        [
            LoginPage,
            RegisterPage
        ]

})
export class AuthPageModule {}
