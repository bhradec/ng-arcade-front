import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../shared/models/game.model';

@Component({
    selector: 'app-game-tile',
    templateUrl: './game-tile.component.html',
    styleUrls: ['./game-tile.component.css']
})
export class GameTileComponent implements OnInit {
    @Input() game: Game;

    constructor() { }
    ngOnInit() { }
}
