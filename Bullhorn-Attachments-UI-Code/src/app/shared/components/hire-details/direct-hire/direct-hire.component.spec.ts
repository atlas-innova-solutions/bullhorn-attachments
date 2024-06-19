import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectHireComponent } from './direct-hire.component';

describe('DirectHireComponent', () => {
  let component: DirectHireComponent;
  let fixture: ComponentFixture<DirectHireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectHireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
