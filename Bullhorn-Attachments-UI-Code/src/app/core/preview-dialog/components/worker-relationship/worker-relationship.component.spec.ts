import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRelationshipComponent } from './worker-relationship.component';

describe('WorkerRelationshipComponent', () => {
  let component: WorkerRelationshipComponent;
  let fixture: ComponentFixture<WorkerRelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerRelationshipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
