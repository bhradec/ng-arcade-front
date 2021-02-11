import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../shared/models/game.model';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-game-tile',
    templateUrl: './game-tile.component.html',
    styleUrls: ['./game-tile.component.css']
})
export class GameTileComponent implements OnInit {
    @Input() game: Game;
    @Input() editMode: boolean;

    constructor(private gameService: GameService) { }
    ngOnInit() { }

    deleteGame(id) {
        this.gameService.deleteGame(id);
    }
}
