import {Injectable} from '@angular/core';
import {ApiProvider} from 'src/app/providers/api.provider';
import {ProductModel} from 'src/app/models/product.model';
import {WooAuthModel} from 'src/app/models/woo-auth.model';
import {WOOCOMMERCE_API_PRODUCTS} from 'src/app/hooks/constants';
import {HttpHeaders} from '@angular/common/http';
import {ITEMS_PER_LIST} from 'src/app/hooks/constants';

@Injectable({
    providedIn: 'root'
})
export class WoocommerceService
{

    constructor(
        private api: ApiProvider
    ) {}

    getProducts(wooAuth: WooAuthModel, search: string = null, page: number = 1, itemsPerPage: number = ITEMS_PER_LIST)
    {
        return new Promise<ProductModel[]>(
            (resolve, reject) =>
            {
                let headers = new HttpHeaders().append("Authorization", 'Basic ' + btoa(wooAuth.client_id + ":" + wooAuth.client_secret));

                let params: any =
                {
                    page: page,
                    per_page: itemsPerPage
                };
                if (search && search.length)
                {
                    params.search = search;
                }

                this.api.get(wooAuth.url + WOOCOMMERCE_API_PRODUCTS, params, {headers: headers}).toPromise().then(
                    (res: any) =>
                    {
                        let products: ProductModel[] = [];
                        for (let prod of res)
                        {
                            products.push(this.castProduct(prod));
                        }
                        console.log("product list ", res, products);

                        resolve(products);
                    },
                    (err) =>
                    {
                        console.error("fail getting product list", err);
                        reject(err);
                    }
                );
            }
        );
    }

    castProduct(prod: any): ProductModel
    {
        let product: ProductModel =
        {
            id: prod.id,
            name: prod.name,
            sku: prod.sku,
            featured: prod.featured,
            price: prod.price,
            regular_price: prod.regular_price,
            status: prod.status,
            stock_status: prod.stock_status,
            category: null,
            image: null,
            tags: null,
            date: prod.date_modified


        }

        //set default  image
        if (prod.images && prod.images.length)
        {
            product.image = prod.images[0].src;
        }

        console.log(prod.categories.length);

        //set categoires array
        if (prod.categories && prod.categories.length)
        {
            let category: string = '';
            for (let cate of prod.categories)
            {
                if (category.length)
                {
                    category = category.concat(', ');
                }
                category = category.concat(cate.name);
            }
            product.category = category;
        }

        //set tags array
        if (prod.tags && prod.tags.length)
        {
            let tagText: string = '';
            for (let tag of prod.tags)
            {
                if (tag.length)
                {
                    tagText.concat(', ');
                }
                tagText.concat(tag.name);
            }
            product.tags = tagText;

        }

        return product;
    }
}
