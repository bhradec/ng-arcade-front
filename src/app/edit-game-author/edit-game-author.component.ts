import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameAuthor } from '../shared/models/game-author.model';
import { GameAuthorService } from '../shared/services/game-author.service';

@Component({
    selector: 'app-edit-game-author',
    templateUrl: './edit-game-author.component.html',
    styleUrls: ['./edit-game-author.component.css']
})
export class EditGameAuthorComponent implements OnInit {
    editGameAuthorForm: FormGroup;
    editGameAuthorErrorMessage: string;
    gameAuthor: GameAuthor;

    constructor(
        private formBuilder: FormBuilder,
        private gameAuthorService: GameAuthorService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let routeParams = this.activatedRoute.snapshot.paramMap;
        let id = Number(routeParams.get("id"));

        this.editGameAuthorForm = this.formBuilder.group({
            nameInput: new FormControl("", Validators.required)
        });

        this.gameAuthorService.getGameAuthors()
        .subscribe((res: GameAuthor[]) => {
            this.gameAuthor = res.find((gameAuthor) => {
                return gameAuthor.id == id;
            })
            
            if (this.gameAuthor) {
                this.nameInput.setValue(this.gameAuthor.name);
            }
        });


    }

    get nameInput() {
        return this.editGameAuthorForm.get("nameInput");
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.editGameAuthorForm.invalid) {
            this.editGameAuthorErrorMessage = "Plesase enter all required data.";
        } else {
            let newGameAuthor = new GameAuthor();
            newGameAuthor.id = this.gameAuthor.id;
            newGameAuthor.name = this.nameInput.value;
            this.gameAuthorService.editGameAuthor(newGameAuthor);
            this.router.navigate(["/manageGameAuthors"]);
        }
    }
}
