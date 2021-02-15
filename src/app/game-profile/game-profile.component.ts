import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from '../shared/models/game.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { GameService } from '../shared/services/game.service';
import { GamesUsersService } from '../shared/services/games-users.service';

@Component({
    selector: 'app-game-profile',
    templateUrl: './game-profile.component.html',
    styleUrls: ['./game-profile.component.css'],
})
export class GameProfileComponent implements OnInit {
    isUserAuthenticated: boolean = false;;
    authChangeSubscription: Subscription;
    gamesChangeSubject: BehaviorSubject<Game[]>;
    gamesChangeSubscription: Subscription;
    errorMessage: string;
    games: Game[];
    game: Game;
    user: User;

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
        private authService: AuthService,
        private gamesUsersService: GamesUsersService,
        private router: Router) { }

    ngOnInit() {
        let routeParams = this.activatedRoute.snapshot.paramMap;
        let id = Number(routeParams.get("id"));

        this.isUserAuthenticated = this.authService.isAuthenticated();
        this.user = this.authService.getUser();
        
        this.authChangeSubscription = this.authService.authChangeSubject
            .subscribe((res: boolean) => {
                this.isUserAuthenticated = res;
                if (this.isUserAuthenticated) {
                    this.user = this.authService.getUser();
                } else {
                    this.router.navigate(["/login"]);
                }
            });
        
        this.gamesChangeSubject = this.gameService.getGames();
        this.gamesChangeSubscription = this.gamesChangeSubject
            .subscribe((res: Game[]) => {
                this.games = res;
                this.game = res.find((game: Game) => {
                    return game.id == id;
                });
                if (!this.game) {
                    this.errorMessage = `Game with the id ${id} does not exist.`;
                } else {
                    this.errorMessage = "";
                }
            });
    }

    logGamePlayedByUser() {
        this.gamesUsersService.addGamePlayedByUser(this.user.id, this.game.id);
    }
    
    ngOnDestroy() {
        this.gamesChangeSubscription.unsubscribe();
    }
}
