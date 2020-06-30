import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {environment} from 'src/environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit
{
  
    public user = null;
    
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private screen_orientation: ScreenOrientation,
        private translate: TranslateService,
    )
    {
        this.initializeApp();
    }

    initializeApp()
    {

        this.platform.ready().then(
            () =>
            {
                if (this.platform.is("cordova"))
                {
                    this.statusBar.styleLightContent();
                    this.statusBar.overlaysWebView(false);
                    this.screen_orientation.lock(this.screen_orientation.ORIENTATIONS.PORTRAIT);
                    this.splashScreen.hide();
                }
                this.initializeTranslate();
            }
        );
    }

    ngOnInit()
    {
      
    }

    initializeTranslate()
    {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('es');
        //change this for select browse lang
        if (this.translate.getBrowserLang() !== undefined)
        {
            this.translate.use(this.translate.getBrowserLang());
        } else
        {
            this.translate.use(this.translate.getDefaultLang());
        }
    }
}
