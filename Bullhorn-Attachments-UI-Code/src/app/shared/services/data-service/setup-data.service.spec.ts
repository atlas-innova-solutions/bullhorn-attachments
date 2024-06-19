import { TestBed } from '@angular/core/testing';
import { SetupDataService } from './setup-data.service';

describe('SetupDataService', () => {
    let service: SetupDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SetupDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
