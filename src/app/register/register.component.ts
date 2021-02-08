import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMismatchValidator } from '../shared/other/password-mismatch-validator';
import { User } from '../shared/models/user.model';
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
    submitError: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UserService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                username: new FormControl("", [Validators.required, Validators.minLength(4)]),
                password: new FormControl("", Validators.required),
                repeatPassword: new FormControl("", Validators.required),
                email: new FormControl("", [Validators.required, Validators.email]),
            },
            {
                validators: passwordMismatchValidator
            });
    }

    get username() { return this.registerForm.get("username"); }
    get password() { return this.registerForm.get("password"); }
    get repeatPassword() { return this.registerForm.get("repeatPassword"); }
    get email() { return this.registerForm.get("email"); }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.submitError = true;
            this.registerErrorMessage = 'Plesase enter all required data.';
        } else {
            this.newUser = new User();

            this.newUser.username = this.registerForm.value.username;
            this.newUser.email = this.registerForm.value.email;
            this.newUser.password = this.registerForm.value.password;
            this.newUser.level = 1;

            this.usersService.addUser(this.newUser).subscribe();
            this.router.navigate(["/login"]);
        }
    }

    passwordsMatch() {
        if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
            return false;
        } else {
            return true;
        }
    }
}
