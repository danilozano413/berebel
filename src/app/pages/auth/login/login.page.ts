import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastProvider} from 'src/app/providers/toast.provider';
import {AuthService} from 'src/app/services/auth.service';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit
{
    public loginForm: FormGroup;
    public showErrors: boolean = false;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toast_provider: ToastProvider,
        private auth_service: AuthService,
        private platform: Platform

    )
    {
        this.loginForm = this.formBuilder.group(
            {
                email:
                    [
                        null,
                        Validators.compose(
                            [
                                Validators.required,
                                Validators.pattern('^([a-zA-Z0-9_.+-]{2,})\\@([a-zA-Z0-9-]{2,})\\.([a-zA-Z0-9-.]{2,})$')
                            ]
                        )
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
                    ]

            }
        );

    }

    ngOnInit()
    {
    }




    goRegister()
    {
        this.router.navigateByUrl("/register");
    }

    hasError(field: string, error: string = null)
    {
        //checks if field has some error or specific
        if (
            this.loginForm.get(field) &&
            ((error && this.loginForm.get(field).hasError(error)) || (!error && this.loginForm.get(field).errors)) &&
            (this.loginForm.get(field).dirty || this.loginForm.get(field).touched || this.showErrors)
        )
        {
            if (error)
            {
                return field + "." + error;
            }
            let errors = [];
            for (let item in this.loginForm.get(field).errors)
            {
                if (this.loginForm.get(field).hasError(item))
                {
                    errors.push(field + "." + item);
                }
            }
            return errors;
        }

        return false;
    }

    login()
    {
        this.toast_provider.loadingMsg("sending").then(
            () =>
            {
                if (this.loginForm.invalid)
                {
                    this.toast_provider.loadingComplete();
                    this.toast_provider.transformError("check_form",true);
                }
                else
                {
                    if (this.platform.is("cordova"))
                    {

                        let email = this.loginForm.get("email").value;
                        let password = this.loginForm.get("password").value;

                        this.auth_service.login(email, password).then(
                            () =>
                            {
                                this.toast_provider.loadingComplete();
                                this.router.navigateByUrl("/home");
                            },
                            () =>
                            {
                                this.toast_provider.loadingComplete();
                                this.toast_provider.transformError("invalid_credentials",true);
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
