import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';


import {ProductRowComponent} from './products/product-row/product-row.component';
import {ProductSkeletonComponent} from './products/product-skeleton/product-skeleton.component';

import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
    declarations:
        [
            ProductRowComponent,
            ProductSkeletonComponent,
            MenuComponent,
            HeaderComponent

        ],
    imports:
        [
            IonicModule,
            CommonModule,
            TranslateModule.forChild(),
            FormsModule,
            ReactiveFormsModule,
        ],
    providers:
        [

        ],
    exports:
        [
            ProductRowComponent,
            ProductSkeletonComponent,
            MenuComponent,
            HeaderComponent
        ],
    entryComponents:
        [
        ]
})

export class ComponentsModule {}