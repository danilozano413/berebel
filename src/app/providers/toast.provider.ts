import {Injectable} from '@angular/core';
import {ToastController, LoadingController} from '@ionic/angular';
import {ToastOptions} from '@ionic/core'
import {TranslateService} from '@ngx-translate/core';
import {TOAST_ERROR_TRANS_DEFAULT, TOAST_ERROR_TRANS_KEY, TOAST_CLASS_SUCCESS, TOAST_CLASS_ERROR, TOAST_DEFAUL_POSITION, TOAST_DEFAUL_DURATION} from 'src/app/hooks/constants';


@Injectable({
    providedIn: 'root'
})
export class ToastProvider
{
    private toast: any = null;
    private loading: any = null;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private translate: TranslateService
    )
    {
    }
    transformError(key: string = null, toast: boolean = false)
    {
        return new Promise(
            (resolve, reject) =>
            {
                if (!key || typeof key !== "string")
                {
                    key = TOAST_ERROR_TRANS_DEFAULT;
                } else
                {
                    //                lower and without spaces
                    key = key.toLowerCase().replace(/ /g, "_");;
                }

                let error = TOAST_ERROR_TRANS_KEY + "." + key.toLowerCase();
                this.translate.get(error).subscribe(
                    (resp) =>
                    {
                        console.error("catched error", error, resp);
                        if (resp != error)
                        {
                            if (toast)
                            {
                                this.toastMsg(resp, TOAST_CLASS_ERROR);
                            }

                            resolve(resp)

                        } else
                        {
                            this.translate.get(TOAST_ERROR_TRANS_KEY + "." + TOAST_ERROR_TRANS_DEFAULT).subscribe(
                                (resp) =>
                                {
                                    if (toast)
                                    {
                                        this.toastMsg(resp, TOAST_CLASS_ERROR);
                                    }
                                    resolve(resp)
                                }
                            );
                        }
                    },
                    (err) =>
                    {
                        reject(err);
                    }
                );
            }
        );
    }

    toastMsgTrans(msg: string, cssclass: string = null)
    {
        return new Promise(
            (resolve, reject) =>
            {
                this.translate.get(msg).subscribe(
                    (resp) =>
                    {
                        this.toastMsg(resp, cssclass).then(
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
        );
    }

    toastMsg(msg: string, cssclass: string = TOAST_CLASS_SUCCESS)
    {
        return new Promise(
            (resolve, reject) =>
            {
                if (this.toast)
                {
                    this.toast.dismiss();
                }
                let opts: ToastOptions = {
                    message: msg,
                    duration: TOAST_DEFAUL_DURATION,
                    position: TOAST_DEFAUL_POSITION,
                    cssClass: cssclass ? cssclass : TOAST_CLASS_SUCCESS,
                    mode: 'md'
                }
                this.toastCtrl.create(opts).then(
                    (res) =>
                    {
                        this.toast = res;
                        this.toast.present();
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

    loadingMsg(msg: string = null, autodismiss: boolean = true)
    {
        return new Promise(
            (resolve, reject) =>
            {
                //check if has previos loader and hidde it
                if (this.loading)
                {
                    console.log("auto hidding loading");
                    this.loading.dismiss().then(() => {}, () => {});
                }
                if (msg)
                {
                    msg = this.translate.instant(msg);
                }
                console.log("create a new loading toast");
                this.loadingCtrl.create({
                    spinner: 'crescent',
                    message: msg,
                    translucent: true,
                    cssClass: ["loading"],
                    mode: 'md'
                }).then(
                    (res) =>
                    {
                        this.loading = res;
                        this.loading.present()
                        resolve();
                    },
                    () =>
                    {
                        reject();
                    }
                );

            }
        );
    }

    loadingComplete()
    {
        return new Promise(
            (resolve, reject) =>
            {
                console.log("loadingComplete");
                if (this.loading)
                {
                    console.log("hidding loading");
                    this.loading.dismiss().then(
                        (res) =>
                        {
                            resolve(res);
                        },
                        (err) =>
                        {
                            reject(err);
                        });
                } else
                {
                    console.log("auto hidded loading", this.loading);
                    resolve(true);
                }
            }
        );
    }

}
