import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    constructor(
        private router: Router,
        private auth_service: AuthService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return new Promise<boolean>(
            (resolve, reject) =>
            {
                this.auth_service.isGranted().then(
                    (res) =>
                    {
                        resolve(res);
                    },
                    (err) =>
                    {
                        this.router.navigateByUrl('/login');
                        reject(err);

                    }
                );
            }
        );
    }

}
