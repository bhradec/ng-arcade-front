import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameAuthor } from '../shared/models/game-author.model';
import { Game } from '../shared/models/game.model';
import { GameAuthorService } from '../shared/services/game-author.service';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
    addGameForm: FormGroup;
    submitError: boolean = false;
    addGameErrorMessage: string;
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]>;
    gameAuthorsChangeSubscription: Subscription;
    gameAuthors: GameAuthor[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private gameAuthorService: GameAuthorService) { }

    ngOnInit() {
        this.addGameForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            link: new FormControl('', Validators.required),
            sourceLink: new FormControl('', Validators.required),
            imagePath: new FormControl('', Validators.required),
            gameAuthorId: new FormControl('', Validators.required)
        });

        this.gameAuthorsChangeSubject = this.gameAuthorService.getGameAuthors();
        this.gameAuthorsChangeSubscription = this.gameAuthorsChangeSubject
            .subscribe((res: GameAuthor[]) => {
                this.gameAuthors = res;
            });
    }

    get name() {
        return this.addGameForm.get('name');
    }
    
    get link() {
        return this.addGameForm.get('link');
    }

    get sourceLink() {
        return this.addGameForm.get('sourceLink');
    }

    get imagePath() {
        return this.addGameForm.get('imagePath');
    }

    get gameAuthorId() {
        return this.addGameForm.get('gameAuthorId');
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.addGameForm.invalid) {
            this.submitError = true;
            this.addGameErrorMessage = 'Plesase enter all required data.';
        } else {
            let newGame = new Game();
            newGame.name = this.name.value;
            newGame.link = this.link.value;
            newGame.sourceLink = this.sourceLink.value;
            newGame.imagePath = this.imagePath.value;
            newGame.gameAuthorId = this.gameAuthorId.value;
            this.gameService.addGame(newGame);
        }
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
