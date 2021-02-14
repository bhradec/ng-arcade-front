import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from '../shared/models/game.model';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-game-profile',
    templateUrl: './game-profile.component.html',
    styleUrls: ['./game-profile.component.css'],
})
export class GameProfileComponent implements OnInit {
    gamesChangeSubject: BehaviorSubject<Game[]>;
    gamesChangeSubscription: Subscription;
    errorMessage: string;
    games: Game[];
    game: Game;

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameService: GameService) { }

    ngOnInit() {
        let routeParams = this.activatedRoute.snapshot.paramMap;
        let id = Number(routeParams.get("id"));

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
    
    ngOnDestroy() {
        this.gamesChangeSubscription.unsubscribe();
    }
}
