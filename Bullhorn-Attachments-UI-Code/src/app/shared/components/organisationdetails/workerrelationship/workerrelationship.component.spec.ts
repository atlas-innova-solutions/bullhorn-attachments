import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerrelationshipComponent } from './workerrelationship.component';

describe('WorkerrelationshipComponent', () => {
  let component: WorkerrelationshipComponent;
  let fixture: ComponentFixture<WorkerrelationshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerrelationshipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerrelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
