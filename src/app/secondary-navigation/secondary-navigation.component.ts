import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-secondary-navigation',
    templateUrl: './secondary-navigation.component.html',
    styleUrls: ['./secondary-navigation.component.css']
})
export class SecondaryNavigationComponent implements OnInit {
    displayMenuButton: boolean;
    displayLogo: boolean;

    @Output() displayMenuEvent = new EventEmitter();

    constructor() { }
    ngOnInit() { }

    toggleMenu() {
        this.displayMenuEvent.emit();
    }
}
