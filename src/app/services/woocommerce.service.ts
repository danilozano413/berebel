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

    getProducts(wooAuth: WooAuthModel, search = null, page: number = 1)
    {
        return new Promise<ProductModel[]>(
            (resolve, reject) =>
            {
                let headers = new HttpHeaders().append("Authorization", 'Basic ' + btoa(wooAuth.client_id + ":" + wooAuth.client_secret));

                let params: any =
                {
                    page: page,
                    per_page: ITEMS_PER_LIST
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
            date: null


        }

        //set default  image
        if (prod.images && prod.images.length)
        {
            product.image = prod.images[0].src;
        }

        //set categoires array
        if (prod.categories && prod.categories.length)
        {
            let category: string = '';
            for (let cate of prod.categories)
            {
                if (category.length)
                {
                    category.concat(', ');
                }
                category.concat(cate.name);
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
        //set date
        if (prod.date_modified_gmt)
        {
            //            product.date = 
        }
        return product;
    }
}
