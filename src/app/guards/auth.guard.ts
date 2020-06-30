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

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {

        return this.auth_service.isGranted();
    }

}
