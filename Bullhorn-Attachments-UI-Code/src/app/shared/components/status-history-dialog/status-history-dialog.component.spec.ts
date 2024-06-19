import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusHistoryDialogComponent } from './status-history-dialog.component';

describe('StatusHistoryDialogComponent', () => {
  let component: StatusHistoryDialogComponent;
  let fixture: ComponentFixture<StatusHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusHistoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
