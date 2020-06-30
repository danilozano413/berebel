import {Component, OnInit} from '@angular/core';
import {WooAuthModel} from 'src/app/models/woo-auth.model';
import {WoocommerceService} from 'src/app/services/woocommerce.service';
import {ProductModel} from 'src/app/models/product.model';
import {ToastProvider} from 'src/app/providers/toast.provider';
import {ITEMS_PER_LIST, ITEMS_PER_PAGE} from 'src/app/hooks/constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{

    public page: number = 1;
    public search: string = null;
    public wooAuth: WooAuthModel = {
        url: null,
        client_id: null,
        client_secret: null

    };
    public loading: boolean = false;
    public skeleton: boolean = false;
    public products: ProductModel[] = [];

    public showConfiguration: boolean = false;

    constructor(

        private woo_service: WoocommerceService,
        private toast_provider: ToastProvider
    ) {}

    ngOnInit()
    {
        //discomment for debug 
                this.wooAuth.url = "https://dani.betademo.es";
                this.wooAuth.client_id = "ck_9276c847402390ff0a12d9e81cecebea93bdb2b3";
                this.wooAuth.client_secret = "cs_d39925b58d4bd559388a9b670d7dade57a870c60";
    }

    hasWooAuth(): boolean
    {
        if (this.wooAuth.url && this.wooAuth.client_id && this.wooAuth.client_secret)
        {
            return true;
        }
        return false;
    }

    ionViewDidEnter()
    {

//        this.wooAuth.url = null;
//        this.wooAuth.client_id = null;
//        this.wooAuth.client_secret = null;

        //check for configuration
        if (this.hasWooAuth())
        {
            this.skeleton = true;
            this.refreshItems().then(
                () =>
                {
                    this.skeleton = false;
                },
                () =>
                {
                    this.skeleton = false;
                }
            );
        } else
        {
            this.showConfiguration = true;
        }

//        setTimeout(
//            () =>
//            {
//                this.wooAuth.url = "https://dani.betademo.es";
//                this.wooAuth.client_id = "ck_9276c847402390ff0a12d9e81cecebea93bdb2b3";
//                this.wooAuth.client_secret = "cs_d39925b58d4bd559388a9b670d7dade57a870c60";
//            }, 800);

    }

    applyConfiguration()
    {
        this.products = [];
        this.skeleton = true;
        this.showConfiguration = false;
        this.refreshItems().then(
            () =>
            {
                this.skeleton = false;
            },
            () =>
            {
                this.skeleton = false;
                this.showConfiguration = true;
            }
        );
    }

    getProducts()
    {
        return new Promise<ProductModel[]>(
            (resolve, reject) =>
            {
                this.woo_service.getProducts(this.wooAuth, this.search, this.page, ITEMS_PER_PAGE).then(
                    (res) =>
                    {
                        resolve(res);
                    },
                    (err) =>
                    {
                        reject(err);
                    }
                );

            }
        );
    }

    refreshItems()
    {
        return new Promise<ProductModel[]>(
            (resolve, reject) =>
            {
                this.loading = true;
                this.page = 1;
                this.getProducts().then(
                    (res) =>
                    {
                        this.products = res;
                        this.loading = false;
                        resolve(res);
                    },
                    (err) =>
                    {
                        this.toast_provider.transformError('credentials', true);
                        this.loading = false;
                        reject(err);
                    }
                );
            }
        );
    }

    infinite(event)
    {
        if (!this.loading && this.page)
        {
            this.loading = true;
            this.page++;

            console.log("Load more products", this.page);
            this.getProducts().then(
                (res) =>
                {
                    this.products = this.products.concat(res);
                    //check if has more products 
                    if (!res.length || res.length < ITEMS_PER_PAGE)
                    {
                        this.page = 0;
                    }

                    this.loading = false;
                    event.target.complete();

                },
                (err) =>
                {
                    this.loading = false;
                    event.target.cancel();

                    this.toast_provider.transformError("moreItems", true);

                }
            );

        }
    }

    newSearch(event)
    {
        this.search = event.target.value;
        if (!this.loading)
        {
            this.loading = true;
            this.page = 1;
            this.refreshItems().then(
                () =>
                {
                    this.loading = false;
                },
                () =>
                {
                    this.loading = false;
                }
            );
        }
    }


    skeletonRepeats(): any[]
    {
        return Array(ITEMS_PER_PAGE);
    }
}
