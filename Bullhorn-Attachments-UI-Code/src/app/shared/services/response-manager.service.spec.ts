import { TestBed } from '@angular/core/testing';

import { ResponseManagerService } from './response-manager.service';

describe('ResponseManagerService', () => {
    let service: ResponseManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ResponseManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
