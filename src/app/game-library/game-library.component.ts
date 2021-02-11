import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from '../shared/models/game.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-game-library',
    templateUrl: './game-library.component.html',
    styleUrls: ['./game-library.component.css'],
})
export class GameLibraryComponent implements OnInit {
    gamesChangeSubject: BehaviorSubject<Game[]>;
    isUserAuthenticated: boolean = false;;
    authChangeSubscription: Subscription;
    gamesChangeSubscription: Subscription;
    games: Game[] = [];
    user: User;

    constructor(
        private authService: AuthService,
        private gameService: GameService,
        private router: Router) { }

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

        this.gamesChangeSubject = this.gameService.getGames();
        this.gamesChangeSubscription = this.gamesChangeSubject
            .subscribe((res: Game[]) => {
                this.games = res;
            });
    }

    logout() {
        this.authService.deauthenticateUser();
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
        this.gamesChangeSubscription.unsubscribe();
    }
}
