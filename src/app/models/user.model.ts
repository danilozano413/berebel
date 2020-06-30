import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class UserModel 
{
    name: string = null;
    email: string = null;
    token?: string = null;
}
