import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameUser } from '../shared/models/game-user.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { GamesUsersService } from '../shared/services/games-users.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    isUserAuthenticated: boolean = false;;
    authChangeSubscription: Subscription;
    gamesUsersChangeSubject: BehaviorSubject<GameUser[]>;
    gamesUsersChangeSubscription: Subscription;
    gamesUsers: GameUser[] = [];
    user: User;

    constructor(
        private authService: AuthService,
        private gamesUsersService: GamesUsersService) { }

    ngOnInit() {
        this.isUserAuthenticated = this.authService.isAuthenticated();
        this.user = this.authService.getUser();
        
        this.authChangeSubscription = this.authService.authChangeSubject
            .subscribe((res: boolean) => {
                this.isUserAuthenticated = res;
                if (this.isUserAuthenticated) {
                    this.user = this.authService.getUser();
                }
            });

        this.gamesUsersChangeSubject = this.gamesUsersService.getGamesPlayedByUsers();
        this.gamesUsersChangeSubscription = this.gamesUsersChangeSubject
            .subscribe((res: GameUser[]) => {
                this.gamesUsers = res.filter((gameUser) => {
                    return gameUser.userId == this.user.id;
                });
            });
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
        this.gamesUsersChangeSubscription.unsubscribe();
    }
}
