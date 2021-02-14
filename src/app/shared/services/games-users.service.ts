import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameUser } from '../models/game-user.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class GamesUsersService {
    gamesUsers: GameUser[] = [];
    gamesUsersChangeSubject: BehaviorSubject<GameUser[]> = new BehaviorSubject(this.gamesUsers);

    constructor(private dataService: DataService) {
        this.syncWithDb();
    }

    syncWithDb() {
        this.dataService.getGamesPlayedByUsers()
            .subscribe((res: { status: number, description?: string, gamesUsers: GameUser[] }) => {
                this.gamesUsers = res.gamesUsers;
                /* Iz baze podataka vraća se relativna putanja slike igre na serveru, 
                potrebno ju je izmjeniti tako da bude apsolutna. */
                this.gamesUsers.forEach((gameUser) => {
                    gameUser.imagePath = environment.SERVER_URL + gameUser.imagePath.substring(2);
                });
                this.gamesUsersChangeSubject.next(this.gamesUsers);
            });
    }

    getGamesPlayedByUsers() {
        return this.gamesUsersChangeSubject;
    }

    addGamePlayedByUser(userId, gameId) {
        this.dataService.addGamePlayedByUser(userId, gameId, new Date())
            .subscribe((res: {status: number, description?: string, insertId?: number}) => {
                this.syncWithDb();
            });
    }
}
