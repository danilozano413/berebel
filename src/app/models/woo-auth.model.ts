import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class WooAuthModel 
{
    url: string = null;
    client_id: string = null;
    client_secret: string = null;
}
