import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPage} from './login/login.page';
import {RegisterPage} from './register/register.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from 'src/app/components/components.module';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    {
        path: 'register',
        component: RegisterPage,
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes),
            ComponentsModule,
            TranslateModule.forChild()
        ],
    exports:
        [
            RouterModule
        ],
})
export class AuthPageRoutingModule {}
