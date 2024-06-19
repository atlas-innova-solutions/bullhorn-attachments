import { TestBed } from '@angular/core/testing';

import { CafEnvironmentConfigurationService } from './caf-environment-configuration.service';

describe('CafEnvironmentConfigurationService', () => {
    let service: CafEnvironmentConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CafEnvironmentConfigurationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
