import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from '../shared/models/game.model';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-manage-games',
    templateUrl: './manage-games.component.html',
    styleUrls: ['./manage-games.component.css']
})
export class ManageGamesComponent implements OnInit {
    gamesChangeSubject: BehaviorSubject<Game[]>;
    gamesChangeSubscription: Subscription;
    games: Game[] = [];

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.gamesChangeSubject = this.gameService.getGames();
        this.gamesChangeSubscription = this.gamesChangeSubject
            .subscribe((res: Game[]) => {
                this.games = res;
            });
    }

    ngOnDestroy() {
        this.gamesChangeSubscription.unsubscribe();
    }
}
