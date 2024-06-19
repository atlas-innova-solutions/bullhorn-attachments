import { TestBed } from '@angular/core/testing';

import { SharedDialogService } from './shared-dialog.service';

describe('SharedDialogService', () => {
  let service: SharedDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
