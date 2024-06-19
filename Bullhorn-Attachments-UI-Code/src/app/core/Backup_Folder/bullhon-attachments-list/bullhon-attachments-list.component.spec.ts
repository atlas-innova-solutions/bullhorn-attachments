import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullhonAttachmentsListComponent } from './bullhon-attachments-list.component';

describe('BullhonAttachmentsListComponent', () => {
  let component: BullhonAttachmentsListComponent;
  let fixture: ComponentFixture<BullhonAttachmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BullhonAttachmentsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BullhonAttachmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
