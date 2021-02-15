import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameAuthor } from '../shared/models/game-author.model';
import { Game } from '../shared/models/game.model';
import { GameAuthorService } from '../shared/services/game-author.service';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-game-author-profile',
    templateUrl: './game-author-profile.component.html',
    styleUrls: ['./game-author-profile.component.css'],
})
export class GameAuthorProfileComponent implements OnInit {
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]>;
    gamesChangeSubject: BehaviorSubject<Game[]>;
    gameAuthorsChangeSubscription: Subscription;
    gamesChangeSubscription: Subscription;
    gameAuthors: GameAuthor;
    gameAuthor: GameAuthor;
    games: Game[] = [];
    errorMessage: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameAuthorService: GameAuthorService, 
        private gameService: GameService) { }
        
    ngOnInit() {
        let routeParams = this.activatedRoute.snapshot.paramMap;
        let id = Number(routeParams.get("id"));

        this.gameAuthorsChangeSubject = this.gameAuthorService.getGameAuthors();
        this.gameAuthorsChangeSubscription = this.gameAuthorsChangeSubject
            .subscribe((res: GameAuthor[]) => {
                this.gameAuthor = res.find((gameAuthor) => {
                    return gameAuthor.id = id;
                });
                if (!this.gameAuthor) {
                    this.errorMessage = `Game author with the id ${id} does not exist.`;
                } else {
                    this.errorMessage = "";
                }
            });

        this.gamesChangeSubject = this.gameService.getGames();
        this.gamesChangeSubscription = this.gamesChangeSubject
            .subscribe((res: Game[]) => {
                this.games = res.filter((game) => {
                    return game.gameAuthorId == id; 
                });
            });
    }
}
