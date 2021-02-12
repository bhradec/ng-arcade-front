import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameAuthor } from '../models/game-author.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class GameAuthorService {
    gameAuthors: GameAuthor[] = [];
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]> = new BehaviorSubject(this.gameAuthors);

    constructor(private dataService: DataService) {
        this.dataService.getGameAuthors()
            .subscribe((res: { status: number, description?: string, gameAuthors: GameAuthor[] }) => {
                this.gameAuthors = res.gameAuthors;
                this.gameAuthorsChangeSubject.next(this.gameAuthors);
            });
    }

    getGameAuthors() {
        return this.gameAuthorsChangeSubject;
    }

    addGameAuthor(gameAuthor) {
        this.dataService.addGameAuthor(gameAuthor)
            .subscribe((res: { status: number, description?: string, insertId?: number }) => {
                gameAuthor.id = res.insertId;
                this.gameAuthors.push(gameAuthor);
                this.gameAuthorsChangeSubject.next(this.gameAuthors);
            });
    }

    editGameAuthor(gameAuthor) {
        this.dataService.editGameAuthor(gameAuthor)
            .subscribe((res) => {
                this.gameAuthors[this.gameAuthors.findIndex(ga => ga.id == gameAuthor.id)] = gameAuthor;
                this.gameAuthorsChangeSubject.next(this.gameAuthors);
            });
    }

    deleteGameAuthor(id) {
        this.dataService.deleteGameAuthor(id)
            .subscribe((res) => {
                this.gameAuthors = this.gameAuthors.filter(gameAuthor => gameAuthor.id != id);
                this.gameAuthorsChangeSubject.next(this.gameAuthors);
            });
    }
}
