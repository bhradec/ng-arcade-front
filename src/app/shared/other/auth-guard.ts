import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}