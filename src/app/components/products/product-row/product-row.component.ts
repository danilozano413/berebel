import {Component, OnInit, Input} from '@angular/core';
import {ProductModel} from 'src/app/models/product.model';

@Component({
    selector: 'app-product-row',
    templateUrl: './product-row.component.html',
    styleUrls: ['./product-row.component.scss'],
})
export class ProductRowComponent implements OnInit
{

    @Input() product: ProductModel = null;

    constructor() {}

    ngOnInit() {}

    hasOffer(): boolean
    {
        if (
            this.product &&
            this.product.price &&
            this.product.regular_price &&
            this.product.price != this.product.regular_price)
        {
            return true;

        }
        return false;
    }

    isPublished(): boolean
    {
        if (this.product && this.product.status == "publish")
        {
            return true;
        }
        return false;
    }

    isAvailable(): boolean
    {
        if (this.product && this.product.stock_status == "instock")
        {
            return true;
        }
        return false;
    }

}
