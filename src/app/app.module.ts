import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {NgModule, Provider, APP_INITIALIZER, LOCALE_ID, ErrorHandler} from '@angular/core';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {ComponentsModule} from 'src/app/components/components.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

//providers
import {ApiProvider} from 'src/app/providers/api.provider';

//Services
import {AuthService} from 'src/app/services/auth.service';
import {WoocommerceService} from 'src/app/services/woocommerce.service';

//Native
import {FirebaseAuthentication} from '@ionic-native/firebase-authentication/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

//Translation
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

export function createTranslateLoader(http: HttpClient)
{
    return new TranslateHttpLoader(http, './assets/lang/', '.json');
}


@NgModule({
    declarations:
        [
            AppComponent
        ],
    entryComponents:
        [

        ],
    imports:
        [
            BrowserModule,
            IonicModule.forRoot(),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                }
            }),
            HttpClientModule,
            AppRoutingModule,
            ComponentsModule
        ],
    providers:
        [
            {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},

            StatusBar,
            SplashScreen,
            FirebaseAuthentication,
            ScreenOrientation,


            AuthService,
            WoocommerceService,
            
            ApiProvider
        ],
    bootstrap: [AppComponent]
})
export class AppModule {}
