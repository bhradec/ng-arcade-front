import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from './data.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public authChangeSubject: Subject<boolean> = new Subject<boolean>();
    public authErrorSubject: Subject<string> = new Subject<string>();

    private user: User;

    constructor(
        private dataService: DataService, 
        private router: Router) { }

    authenticateUser(username, password) {
        this.dataService
            .authenticateUser(username, password)
            .subscribe((res: { status: number; description?: string; user?: User }) => {
                if (res.status == 200) {
                    this.user = res.user;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.authChangeSubject.next(true);
                    this.router.navigate(['/']);
                } else {
                    this.authErrorSubject.next(res.description);
                }
            }
        );
    }

    deauthenticateUser() {
        this.user = null;
        localStorage.removeItem('user');
        this.authChangeSubject.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem('user'));
        } else {
            return this.user;
        }
    }

    isAuthenticated() {
        return this.user != null;
    }
}
