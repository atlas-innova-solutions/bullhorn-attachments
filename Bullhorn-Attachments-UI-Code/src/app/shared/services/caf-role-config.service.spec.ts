import { TestBed } from '@angular/core/testing';

import { CafRoleConfigService } from './caf-role-config.service';

describe('CafRoleConfigService', () => {
    let service: CafRoleConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CafRoleConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
