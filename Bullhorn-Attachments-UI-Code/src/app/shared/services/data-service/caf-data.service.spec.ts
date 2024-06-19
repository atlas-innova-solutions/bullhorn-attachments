import { TestBed } from '@angular/core/testing';

import { CafDataService } from './caf-data.service';

describe('CafDataService', () => {
    let service: CafDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CafDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
