import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class ProductModel 
{
    id: number = null;
    name: string = null;
    image: string = null;
    sku: string = null;
    stock_status: string = null;
    price: number = null;
    regular_price: number = null;
    category: string = null;
    tags: string = null;
    featured: boolean = false;
    date: string = null;
    status: string = null;

}
