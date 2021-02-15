import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLevels } from '../shared/enums/user-levels';
import { User } from '../shared/models/user.model';
import { passwordMismatchValidator } from '../shared/other/password-mismatch-validator';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    newUser: User;
    registerErrorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UserService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                usernameInput: new FormControl("", [Validators.required, Validators.minLength(4)]),
                passwordInput: new FormControl("", Validators.required),
                repeatPasswordInput: new FormControl("", Validators.required),
                emailInput: new FormControl("", [Validators.required, Validators.email]),
            },
            {
                validators: passwordMismatchValidator
            });
    }

    get usernameInput() {
        return this.registerForm.get("usernameInput");
    }

    get passwordInput() {
        return this.registerForm.get("passwordInput");
    }

    get repeatPasswordInput() {
        return this.registerForm.get("repeatPasswordInput");
    }

    get emailInput() {
        return this.registerForm.get("emailInput");
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerErrorMessage = 'Plesase enter all required data.';
        } else {
            this.newUser = new User();

            this.newUser.username = this.usernameInput.value;
            this.newUser.email = this.emailInput.value;
            this.newUser.password = this.passwordInput.value;
            this.newUser.level = UserLevels.USER;

            this.usersService.addUser(this.newUser).subscribe(
                (res: { status: number, description?: string }) => {
                    if (res.status == 200) {
                        this.router.navigate(["/login"]);
                    } else {
                        this.registerErrorMessage = res.description;
                    }
                }
            );
        }
    }

    passwordsMatch() {
        if ((this.passwordInput.value != this.repeatPasswordInput.value) && (
            this.repeatPasswordInput.touched || this.repeatPasswordInput.dirty)) {
            return false;
        } else {
            return true;
        }
    }
}
