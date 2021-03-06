import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    isUserAuthenticated: boolean = false;
    authChangeSubscription: Subscription;
    displayMainNavigation: boolean = true;
    user: User;

    constructor(
        private authService: AuthService,
        private router: Router,
        private breakpointObserver: BreakpointObserver) { }

    ngOnInit() {
        this.isUserAuthenticated = this.authService.isAuthenticated();
        this.authChangeSubscription = this.authService.authChangeSubject
            .subscribe((res: boolean) => {
                this.isUserAuthenticated = res;
            });

        if (this.isUserAuthenticated) {
            this.user = this.authService.getUser();
        } else {
            this.router.navigate(["/login"]);
        }

        this.breakpointObserver
            .observe([`(max-width: 768px)`])
            .subscribe((breakpointState: BreakpointState) => {
                if (breakpointState.matches) {
                    this.displayMainNavigation = false;
                } else {
                    this.displayMainNavigation = true;
                }
            });
    }

    toggleMainNav() {
        if (this.displayMainNavigation == true) {
            this.displayMainNavigation = false;
        } else {
            this.displayMainNavigation = true;
        }
    }

    logout() {
        this.authService.deauthenticateUser();
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
    }
}
