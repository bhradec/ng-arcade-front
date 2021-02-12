import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    games: Game[] = [];
    gamesChangeSubject: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);

    constructor(private dataService: DataService) {
        this.syncWithDb();
    }

    syncWithDb() {
        this.dataService.getGames()
            .subscribe((res: { status: number, description?: string, games: Game[] }) => {
                this.games = res.games;
                /* Iz baze podataka vraća se relativna putanja slike igre na serveru, 
                potrebno ju je izmjeniti tako da bude apsolutna. */
                this.games.forEach((game) => {
                    game.imagePath = environment.SERVER_URL + game.imagePath.substring(2);
                });
                this.gamesChangeSubject.next(this.games);
            });
    }

    getGames() {
        return this.gamesChangeSubject;
    }

    addGame(gameFormData) {
        this.dataService.addGame(gameFormData)
            .subscribe((res: {status: number, description?: string, insertId?: number}) => {
                this.syncWithDb();
            });
    }

    editGame(gameFormData) {
        this.dataService.addGame(gameFormData)
            .subscribe((res: {status: number, description?: string, changedRows?: number}) => {
                this.syncWithDb();
            });
    }

    deleteGame(id) {
        this.dataService.deleteGame(id)
            .subscribe((res) => {
                this.games = this.games.filter(game => game.id != id);
                this.gamesChangeSubject.next(this.games);
            });
    }

    uploadGameImage(gameId, gameImage) {
        return this.dataService.uploadGameImage(gameId, gameImage);
    }
}
