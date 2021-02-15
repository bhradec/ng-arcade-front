import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    image: any;

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private gameAuthorService: GameAuthorService,
        private router: Router) { }

    ngOnInit() {
        this.addGameForm = this.formBuilder.group({
            nameInput: new FormControl("", Validators.required),
            linkInput: new FormControl("", Validators.required),
            sourceLinkInput: new FormControl("", Validators.required),
            imageInput: new FormControl("", Validators.required),
            descriptionInput: new FormControl("", Validators.required),
            gameAuthorIdInput: new FormControl("", Validators.required)
        });

        this.gameAuthorsChangeSubject = this.gameAuthorService.getGameAuthors();
        this.gameAuthorsChangeSubscription = this.gameAuthorsChangeSubject
            .subscribe((res: GameAuthor[]) => {
                this.gameAuthors = res;
            });
    }

    get nameInput() {
        return this.addGameForm.get("nameInput");
    }

    get linkInput() {
        return this.addGameForm.get("linkInput");
    }

    get sourceLinkInput() {
        return this.addGameForm.get("sourceLinkInput");
    }

    get imageInput() {
        return this.addGameForm.get("imageInput");
    }

    get descriptionInput() {
        return this.addGameForm.get("descriptionInput");
    }

    get gameAuthorIdInput() {
        return this.addGameForm.get("gameAuthorIdInput");
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.image = event.target.files[0];
        }
    }

    onSubmit() {
        if (this.addGameForm.invalid) {
            this.addGameErrorMessage = "Plesase enter all required data.";
        } else {
            let formData = new FormData();
            formData.append("name", this.nameInput.value);
            formData.append("link", this.linkInput.value);
            formData.append("sourceLink", this.sourceLinkInput.value);
            formData.append("image", this.image);
            formData.append("description", this.descriptionInput.value);
            formData.append("gameAuthorId", this.gameAuthorIdInput.value);
            this.gameService.addGame(formData);
            this.router.navigate(["/manageGames"]);
        }
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
