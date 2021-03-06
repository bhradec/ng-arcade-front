import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserLevels } from '../shared/enums/user-levels';

@Component({
    selector: 'app-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {
    userLevels = UserLevels;
    
    @Input() user: User;
    
    constructor(private authService: AuthService) { }
    ngOnInit() { }

    logout() {
        this.authService.deauthenticateUser();
    }
}
