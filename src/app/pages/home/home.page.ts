import {Component, OnInit} from '@angular/core';
import {WooAuthModel} from 'src/app/models/woo-auth.model';
import {WoocommerceService} from 'src/app/services/woocommerce.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{

    public wooAuth: WooAuthModel = {
        url: null,
        client_id: null,
        client_secret: null

    };

    constructor(

        private woo_service: WoocommerceService
    ) {}

    ngOnInit()
    {
        this.wooAuth.url = "https://dani.betademo.es";
        this.wooAuth.client_id = "ck_9276c847402390ff0a12d9e81cecebea93bdb2b3";
        this.wooAuth.client_secret = "cs_d39925b58d4bd559388a9b670d7dade57a870c60";
        this.getProducts();
    }

    getProducts()
    {
        this.woo_service.getProducts(this.wooAuth);
    }

}
