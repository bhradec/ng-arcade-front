import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
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
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });

        this.authErrorSubscription = this.authService.authErrorSubject
            .subscribe((res: string) => {
                this.loginErrorMessage = res;
            });
    }

    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginErrorMessage = 'Plesase enter all required data.';
        } else {
            this.authService.authenticateUser(
                this.username.value,
                this.password.value
            );
        }
    }

    ngOnDestroy() {
        this.authErrorSubscription.unsubscribe();
    }
}
