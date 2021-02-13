import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameAuthorComponent } from './add-game-author.component';

describe('AddGameAuthorComponent', () => {
    let component: AddGameAuthorComponent;
    let fixture: ComponentFixture<AddGameAuthorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddGameAuthorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddGameAuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
