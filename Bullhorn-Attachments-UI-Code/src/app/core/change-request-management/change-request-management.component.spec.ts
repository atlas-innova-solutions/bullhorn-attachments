import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestManagementComponent } from './change-request-management.component';

describe('ChangeRequestManagementComponent', () => {
  let component: ChangeRequestManagementComponent;
  let fixture: ComponentFixture<ChangeRequestManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeRequestManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeRequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
