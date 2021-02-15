import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameAuthor } from '../shared/models/game-author.model';
import { Game } from '../shared/models/game.model';
import { GameAuthorService } from '../shared/services/game-author.service';

@Component({
    selector: 'app-manage-game-authors',
    templateUrl: './manage-game-authors.component.html',
    styleUrls: ['./manage-game-authors.component.css']
})
export class ManageGameAuthorsComponent implements OnInit {
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]>;
    gameAuthorsChangeSubscription: Subscription;
    gameAuthors: GameAuthor[] = [];

    constructor(private gameAuthorService: GameAuthorService) { }

    ngOnInit() {
        this.gameAuthorsChangeSubject = this.gameAuthorService.getGameAuthors();
        this.gameAuthorsChangeSubscription = this.gameAuthorsChangeSubject
            .subscribe((res: Game[]) => {
                this.gameAuthors = res;
            });
    }

    deleteGameAuthor(id) {
        this.gameAuthorService.deleteGameAuthor(id);
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
