import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {
    constructor(private authService: AuthService) { }
    
    ngOnInit() { }

    logout() {
        this.authService.deauthenticateUser();
    }
}
