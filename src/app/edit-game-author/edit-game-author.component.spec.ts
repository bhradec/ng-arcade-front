import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameAuthorComponent } from './edit-game-author.component';

describe('EditGameAuthorComponent', () => {
    let component: EditGameAuthorComponent;
    let fixture: ComponentFixture<EditGameAuthorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditGameAuthorComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditGameAuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
