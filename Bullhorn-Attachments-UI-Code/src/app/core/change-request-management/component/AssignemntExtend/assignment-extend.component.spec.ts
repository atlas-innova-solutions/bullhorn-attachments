import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentExtendComponent } from './assignment-extend.component';

describe('AssignmentExtendComponent', () => {
  let component: AssignmentExtendComponent;
  let fixture: ComponentFixture<AssignmentExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentExtendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
