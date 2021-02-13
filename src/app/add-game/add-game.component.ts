import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameAuthor } from '../shared/models/game-author.model';
import { GameAuthorService } from '../shared/services/game-author.service';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
    addGameForm: FormGroup;
    addGameErrorMessage: string;
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]>;
    gameAuthorsChangeSubscription: Subscription;
    gameAuthors: GameAuthor[] = [];
    gameImage: any;

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private gameAuthorService: GameAuthorService,
        private router: Router) { }

    ngOnInit() {
        this.addGameForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            link: new FormControl('', Validators.required),
            sourceLink: new FormControl('', Validators.required),
            image: new FormControl('', Validators.required),
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

    get image() {
        return this.addGameForm.get('image');
    }

    get gameAuthorId() {
        return this.addGameForm.get('gameAuthorId');
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.gameImage = event.target.files[0];
        }
    }

    onSubmit() {
        if (this.addGameForm.invalid) {
            this.addGameErrorMessage = 'Plesase enter all required data.';            
        } else {
            let formData = new FormData();
            formData.append("name", this.name.value);
            formData.append("link", this.link.value);
            formData.append("sourceLink", this.sourceLink.value);
            formData.append("image", this.gameImage);
            formData.append("gameAuthorId", this.gameAuthorId.value);
            this.gameService.addGame(formData);
            this.router.navigate(["/manageGames"]);
        }
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
