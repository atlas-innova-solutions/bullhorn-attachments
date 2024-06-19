import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmemtComponent } from './assignmemt.component';

describe('AssignmemtComponent', () => {
  let component: AssignmemtComponent;
  let fixture: ComponentFixture<AssignmemtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmemtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmemtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
