import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullhornDashboardComponent } from './bullhorn-dashboard.component';

describe('BullhornDashboardComponent', () => {
  let component: BullhornDashboardComponent;
  let fixture: ComponentFixture<BullhornDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BullhornDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BullhornDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
