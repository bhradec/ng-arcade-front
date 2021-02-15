import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameAuthor } from '../shared/models/game-author.model';
import { Game } from '../shared/models/game.model';
import { GameAuthorService } from '../shared/services/game-author.service';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-edit-game',
    templateUrl: './edit-game.component.html',
    styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
    editGameForm: FormGroup;
    editGameErrorMessage: string;
    gameAuthorsChangeSubject: BehaviorSubject<GameAuthor[]>;
    gameAuthorsChangeSubscription: Subscription;
    gameAuthors: GameAuthor[] = [];
    image: any;
    game: Game;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private gameAuthorService: GameAuthorService,
        private router: Router) { }

    ngOnInit() {
        let routeParams = this.activatedRoute.snapshot.paramMap;
        let id = Number(routeParams.get("id"));

        this.editGameForm = this.formBuilder.group({
            nameInput: new FormControl("", Validators.required),
            linkInput: new FormControl("", Validators.required),
            sourceLinkInput: new FormControl("", Validators.required),
            imageInput: new FormControl(""),
            descriptionInput: new FormControl("", Validators.required),
            gameAuthorIdInput: new FormControl("", Validators.required)
        });

        this.gameAuthorsChangeSubject = this.gameAuthorService.getGameAuthors();
        this.gameAuthorsChangeSubscription = this.gameAuthorsChangeSubject
            .subscribe((res: GameAuthor[]) => {
                this.gameAuthors = res;
            });

        this.gameService.getGames()
            .subscribe((res: Game[]) => {
                this.game = res.find((game) => {
                    return game.id == id;
                })
                
                if (this.game) {
                    this.nameInput.setValue(this.game.name);
                    this.linkInput.setValue(this.game.link);
                    this.sourceLinkInput.setValue(this.game.sourceLink);
                    this.descriptionInput.setValue(this.game.description);
                    this.gameAuthorIdInput.setValue(this.game.gameAuthorId);
                }
            });
    }

    get nameInput() {
        return this.editGameForm.get("nameInput");
    }

    get linkInput() {
        return this.editGameForm.get("linkInput");
    }

    get sourceLinkInput() {
        return this.editGameForm.get("sourceLinkInput");
    }

    get imageInput() {
        return this.editGameForm.get("imageInput");
    }

    get descriptionInput() {
        return this.editGameForm.get("descriptionInput");
    }

    get gameAuthorIdInput() {
        return this.editGameForm.get("gameAuthorIdInput");
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
        if (this.editGameForm.invalid) {
            this.editGameErrorMessage = 'Plesase enter all required data.';            
        } else {
            let formData = new FormData();

            formData.append("id", `${this.game.id}`);
            formData.append("name", this.nameInput.value);
            formData.append("link", this.linkInput.value);
            formData.append("sourceLink", this.sourceLinkInput.value);
            formData.append("description", this.descriptionInput.value);
            formData.append("gameAuthorId", this.gameAuthorIdInput.value);

            if (this.image) { 
                formData.append("image", this.image);
            }
            
            this.gameService.editGame(formData);
            this.router.navigate(["/manageGames"]);
        }
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
