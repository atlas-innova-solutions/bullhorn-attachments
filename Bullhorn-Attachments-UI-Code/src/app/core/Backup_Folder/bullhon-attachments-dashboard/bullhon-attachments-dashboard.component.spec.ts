import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullhonAttachmentsDashboardComponent } from './bullhon-attachments-dashboard.component';

describe('BullhonAttachmentsDashboardComponent', () => {
  let component: BullhonAttachmentsDashboardComponent;
  let fixture: ComponentFixture<BullhonAttachmentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BullhonAttachmentsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BullhonAttachmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
