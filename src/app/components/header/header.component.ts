import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit
{
    @Input() title: string = null;
    @Input() nolines: boolean = false;
    @Input() logoutbtn: boolean = true;


    constructor(
        private router: Router,
        private auth_service: AuthService
    ) {}

    ngOnInit() {}

    goHome()
    {
        this.router.navigateByUrl("/home");
    }


    showImage(): boolean
    {
        if (!this.title)
        {
            return true;
        }
        return false;

    }

    logout()
    {
        this.auth_service.logout().then(
            () =>
            {
                this.router.navigateByUrl("/login");
            },
            () =>
            {
                this.router.navigateByUrl("/login");
            }
        );
    }
}
