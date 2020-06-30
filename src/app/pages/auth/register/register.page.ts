import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastProvider} from 'src/app/providers/toast.provider';
import {AuthService} from 'src/app/services/auth.service';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit
{
    public registerForm: FormGroup;
    public showErrors: boolean = false;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toast_provider: ToastProvider,
        private auth_service: AuthService,
        private platform: Platform

    )
    {
        this.registerForm = this.formBuilder.group(
            {
                email:
                    [
                        null,
                        Validators.compose(
                            [
                                Validators.required,
                                Validators.pattern('^([a-zA-Z0-9_.+-]{2,})\\@([a-zA-Z0-9-]{2,})\\.([a-zA-Z0-9-.]{2,})$')
                            ]
                        ),
                        (controll: FormControl) =>
                        {
                            return this.checkEmail(controll);
                        }
                    ],
                name:
                    [
                        null,
                        Validators.required
                    ],
                password:
                    [
                        null,
                        Validators.compose(
                            [
                                Validators.required,
                                Validators.minLength(8),
                                Validators.maxLength(24)
                            ]
                        )
                    ],
                password_conf:
                    [null,
                        Validators.compose(
                            [
                                Validators.required,
                                this.checkPasswords

                            ]
                        )
                    ]
            }
        );

    }

    ngOnInit()
    {
    }


    checkEmail(control: FormControl = null)
    {
        return new Promise<ValidationErrors | null>(
            (resolve) =>
            {
                //                this.user_service_sw.checkEmailUserItem(control.value).toPromise().then(
                //                    (res) =>
                //                    {
                resolve(null);
                //            },
                //                    (err) =>
                //                    {
                //                        console.error("Fail on attempt to check email", err);
                //                        resolve({inuse: true});
                //                    }
                //                );
            }
        );
    }

    checkPasswords(control: FormControl = null): ValidationErrors | null 
    {
        let pass = null;
        let passConf = null;
        if (control.parent && control.parent instanceof FormGroup)
        {
            let group: FormGroup = control.parent;
            if (group && group.get("password") && group.get("password_conf"))
            {
                pass = group.get("password").value;
                passConf = group.get("password_conf").value;
            }

        }
        return pass === passConf ? null : {match: true};
    }

    goLogin()
    {
        this.router.navigateByUrl("/login");
    }

    hasError(field: string, error: string = null)
    {
        //checks if field has some error or specific
        if (
            this.registerForm.get(field) &&
            ((error && this.registerForm.get(field).hasError(error)) || (!error && this.registerForm.get(field).errors)) &&
            (this.registerForm.get(field).dirty || this.registerForm.get(field).touched || this.showErrors)
        )
        {
            if (error)
            {
                return field + "." + error;
            }
            let errors = [];
            for (let item in this.registerForm.get(field).errors)
            {
                if (this.registerForm.get(field).hasError(item))
                {
                    errors.push(field + "." + item);
                }
            }
            return errors;
        }

        return false;
    }

    register()
    {
        this.toast_provider.loadingMsg("sending").then(
            () =>
            {
                if (this.registerForm.invalid)
                {
                    this.toast_provider.loadingComplete();
                    this.toast_provider.transformError("check_form",true);
                }
                else
                {
                    if (this.platform.is("cordova"))
                    {

                        let name = this.registerForm.get("name").value;
                        let email = this.registerForm.get("email").value;
                        let password = this.registerForm.get("password").value;

                        this.auth_service.register(email, password).then(
                            () =>
                            {
                                this.toast_provider.loadingComplete();
                                this.toast_provider.toastMsgTrans("registered_successfully");
                                this.goLogin();
                            },
                            () =>
                            {
                                this.toast_provider.loadingComplete();
                                this.toast_provider.transformError("email_inuse",true);
                            }
                        );

                    } else
                    {
                        this.toast_provider.loadingComplete();
                        this.toast_provider.transformError("cordova",true);

                    }
                }

            }
        );
    }
}