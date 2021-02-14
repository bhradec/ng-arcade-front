import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Breakpoints } from "../shared/enums/breakpoints";

@Component({
    selector: 'app-secondary-navigation',
    templateUrl: './secondary-navigation.component.html',
    styleUrls: ['./secondary-navigation.component.css']
})
export class SecondaryNavigationComponent implements OnInit {
    displayMenuButton: boolean;
    displayLogo: boolean;

    @Output() displayMenuEvent = new EventEmitter();

    constructor(private breakpointObserver: BreakpointObserver) { }

    ngOnInit() {
        this.breakpointObserver
            .observe([`(min-width: ${Breakpoints.MEDIUM + 1}px)`])
            .subscribe((breakpointState: BreakpointState) => {
                if (breakpointState.matches) {
                    this.displayMenuButton = false;
                    this.displayLogo = false;
                } else {
                    this.displayMenuButton = true;
                    this.displayLogo = true;
                }
            });
    }

    toggleMenu() {
        this.displayMenuEvent.emit();
    }
}
