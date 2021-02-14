import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private authService: AuthService,
        private title: Title) { }

    ngOnInit() {
        this.title.setTitle("ngArcade");
        this.authService.getUser();
    }
}
