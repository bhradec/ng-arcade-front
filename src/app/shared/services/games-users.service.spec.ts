import { TestBed } from '@angular/core/testing';

import { GamesUsersService } from './games-users.service';

describe('GamesUsersService', () => {
    let service: GamesUsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GamesUsersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
