import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAuthorProfileComponent } from './game-author-profile.component';

describe('GameAuthorProfileComponent', () => {
  let component: GameAuthorProfileComponent;
  let fixture: ComponentFixture<GameAuthorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAuthorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAuthorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
