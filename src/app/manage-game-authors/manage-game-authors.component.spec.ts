import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGameAuthorsComponent } from './manage-game-authors.component';

describe('ManageGameAuthorsComponent', () => {
  let component: ManageGameAuthorsComponent;
  let fixture: ComponentFixture<ManageGameAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGameAuthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGameAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
