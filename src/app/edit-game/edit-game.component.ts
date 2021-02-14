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
    gameImage: any;
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
            name: new FormControl("", Validators.required),
            link: new FormControl("", Validators.required),
            sourceLink: new FormControl("", Validators.required),
            image: new FormControl(""),
            description: new FormControl("", Validators.required),
            gameAuthorId: new FormControl("", Validators.required)
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
                    this.name.setValue(this.game.name);
                    this.link.setValue(this.game.link);
                    this.sourceLink.setValue(this.game.sourceLink);
                    this.description.setValue(this.game.description);
                    this.gameAuthorId.setValue(this.game.gameAuthorId);
                }
            });
    }

    get name() {
        return this.editGameForm.get('name');
    }
    
    get link() {
        return this.editGameForm.get('link');
    }

    get sourceLink() {
        return this.editGameForm.get('sourceLink');
    }

    get image() {
        return this.editGameForm.get('image');
    }

    get description() {
        return this.editGameForm.get('description');
    }

    get gameAuthorId() {
        return this.editGameForm.get('gameAuthorId');
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
        if (this.editGameForm.invalid) {
            this.editGameErrorMessage = 'Plesase enter all required data.';            
        } else {
            let formData = new FormData();

            formData.append("id", `${this.game.id}`);
            formData.append("name", this.name.value);
            formData.append("link", this.link.value);
            formData.append("sourceLink", this.sourceLink.value);
            formData.append("description", this.description.value);
            formData.append("gameAuthorId", this.gameAuthorId.value);

            if (this.gameImage) { 
                formData.append("image", this.gameImage); 
            }
            
            this.gameService.editGame(formData);
            this.router.navigate(["/manageGames"]);
        }
    }

    ngOnDestroy() {
        this.gameAuthorsChangeSubscription.unsubscribe();
    }
}
