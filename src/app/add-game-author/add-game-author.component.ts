import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameAuthor } from '../shared/models/game-author.model';
import { GameAuthorService } from '../shared/services/game-author.service';

@Component({
    selector: 'app-add-game-author',
    templateUrl: './add-game-author.component.html',
    styleUrls: ['./add-game-author.component.css']
})
export class AddGameAuthorComponent implements OnInit {
    addGameAuthorForm: FormGroup;
    addGameAuthorErrorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private gameAuthorService: GameAuthorService,
        private router: Router) { }

    ngOnInit() {
        this.addGameAuthorForm = this.formBuilder.group({
            name: new FormControl('', Validators.required)
        });
    }

    get name() {
        return this.addGameAuthorForm.get('name');
    }
    
    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.addGameAuthorForm.invalid) {
            this.addGameAuthorErrorMessage = 'Plesase enter all required data.';            
        } else {
            let newGameAuthor = new GameAuthor();
            newGameAuthor.name = this.name.value;
            this.gameAuthorService.addGameAuthor(newGameAuthor);
            this.router.navigate(["/manageGameAuthors"]);
        }
    }
}
