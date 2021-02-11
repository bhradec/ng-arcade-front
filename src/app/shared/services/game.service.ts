import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    games: Game[] = [];
    gamesChangeSubject: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);

    constructor(private dataService: DataService) {
        this.dataService.getGames()
            .subscribe((res: { status: number, description?: string, games: Game[] }) => {
                this.games = res.games;
                this.gamesChangeSubject.next(this.games);
            });
    }

    getGames() {
        return this.gamesChangeSubject;
    }

    addGame(game) {
        this.dataService.addGame(game)
            .subscribe((res: {status: number, description?: string, insertId?: number}) => {
                game.id = res.insertId;
                this.games.push(game);
                this.gamesChangeSubject.next(this.games);
            });
    }

    editGame(game) {
        this.dataService.editGame(game)
            .subscribe((res) => {
                this.games[this.games.findIndex(g => g.id == game.id)] = game;
                this.gamesChangeSubject.next(this.games);
            });
    }

    deleteGame(id) {
        this.dataService.deleteGame(id)
            .subscribe((res) => {
                this.games = this.games.filter(game => game.id != id);
                this.gamesChangeSubject.next(this.games);
            });
    }
}
