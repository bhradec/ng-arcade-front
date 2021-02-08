import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ng-arcade-front';

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.getUser();
    }
}
