import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    authErrorSubscription: Subscription;
    loginForm: FormGroup;
    loginErrorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usernameInput: new FormControl("", Validators.required),
            passwordInput: new FormControl("", Validators.required),
        });

        this.authErrorSubscription = this.authService.authErrorSubject
            .subscribe((res: string) => {
                this.loginErrorMessage = res;
            });
    }

    get usernameInput() {
        return this.loginForm.get('usernameInput');
    }
    get passwordInput() {
        return this.loginForm.get('passwordInput');
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginErrorMessage = 'Plesase enter all required data.';
        } else {
            this.authService.authenticateUser(
                this.usernameInput.value,
                this.passwordInput.value
            );
        }
    }

    ngOnDestroy() {
        this.authErrorSubscription.unsubscribe();
    }
}
