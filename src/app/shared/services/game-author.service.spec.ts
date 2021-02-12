import { TestBed } from '@angular/core/testing';

import { GameAuthorService } from './game-author.service';

describe('GameAuthorService', () => {
  let service: GameAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
