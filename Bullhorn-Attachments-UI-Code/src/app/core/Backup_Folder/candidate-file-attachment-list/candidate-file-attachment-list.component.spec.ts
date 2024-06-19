import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFileAttachmentListComponent } from './candidate-file-attachment-list.component';

describe('CandidateFileAttachmentListComponent', () => {
  let component: CandidateFileAttachmentListComponent;
  let fixture: ComponentFixture<CandidateFileAttachmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateFileAttachmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateFileAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
